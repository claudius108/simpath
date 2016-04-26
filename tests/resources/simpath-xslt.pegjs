Expr = 	ExprSingle:ExprSingle ("," ExprSingle)* {return ExprSingle;}
ExprSingle = ForExpr / QuantifiedExpr / IfExpr / OrExpr:OrExpr { return OrExpr;}
ForExpr = SimpleForClause "return" ExprSingle
SimpleForClause = "for" "$" VarName "in" ExprSingle ("," "$" VarName "in" ExprSingle)*
QuantifiedExpr = ("some" / "every") "$" VarName "in" ExprSingle ("," "$" VarName "in" ExprSingle)* "satisfies" ExprSingle
IfExpr = "if" "(" Expr ")" "then" ExprSingle "else" ExprSingle
OrExpr = AndExpr:AndExpr ( "or" AndExpr )* {return AndExpr;}
AndExpr = ComparisonExpr:ComparisonExpr ( "and" ComparisonExpr )* {return ComparisonExpr;}
ComparisonExpr  = RangeExpr:RangeExpr ( (ValueComp / GeneralComp / NodeComp) RangeExpr )? {return RangeExpr;}
RangeExpr  = AdditiveExpr:AdditiveExpr ( "to" AdditiveExpr )? {return AdditiveExpr;}
AdditiveExpr  = MultiplicativeExpr:MultiplicativeExpr ( ("+" / "-") MultiplicativeExpr )* {return MultiplicativeExpr;}
MultiplicativeExpr  = UnionExpr:UnionExpr ( ("*" / "div" / "idiv" / "mod") UnionExpr )* {return UnionExpr;}
UnionExpr  = IntersectExceptExpr:IntersectExceptExpr ( ("union" / "|") IntersectExceptExpr )* {return IntersectExceptExpr;}
IntersectExceptExpr  = InstanceofExpr:InstanceofExpr ( ("intersect" / "except") InstanceofExpr )* {return InstanceofExpr;}
InstanceofExpr  = TreatExpr:TreatExpr ( "instance" "of" SequenceType )? {return TreatExpr;}
TreatExpr  = CastableExpr:CastableExpr ( "treat" "as" SequenceType )? {return CastableExpr;}
CastableExpr  = CastExpr:CastExpr ( "castable" "as" SingleType )? {return CastExpr;}
CastExpr  = UnaryExpr:UnaryExpr ( "cast" "as" SingleType )? {return UnaryExpr;}
UnaryExpr  = ("-" / "+")* ValueExpr:ValueExpr {return ValueExpr;}
ValueExpr  = PathExpr:PathExpr {return PathExpr;}
GeneralComp  = "=" / "!=" / "<" / "<=" / ">" / ">="
ValueComp  = "eq" / "ne" / "lt" / "le" / "gt" / "ge"
NodeComp  = "is" / "<<" / ">>"
PathExpr  = ("/" RelativePathExpr?) / ("//" RelativePathExpr) / RelativePathExpr:RelativePathExpr {return RelativePathExpr;}
RelativePathExpr  = StepExpr:StepExpr (("/" / "//") StepExpr)* {return StepExpr;}
StepExpr  = FilterExpr:FilterExpr / AxisStep {return FilterExpr;}
AxisStep  = (ReverseStep / ForwardStep) PredicateList
ForwardStep  = (ForwardAxis NodeTest) / AbbrevForwardStep
ForwardAxis  = ("child" "::") / ("descendant" "::") / ("attribute" "::") / ("self" "::")
/ ("descendant-or-self" "::")
/ ("following-sibling" "::")
/ ("following" "::")
/ ("namespace" "::")
AbbrevForwardStep  = "@"? NodeTest
ReverseStep  = (ReverseAxis NodeTest) / AbbrevReverseStep
ReverseAxis  = ("parent" "::") / ("ancestor" "::") / ("preceding-sibling" "::") / ("preceding" "::") / ("ancestor-or-self" "::")
AbbrevReverseStep  = ".."
NodeTest  = KindTest / NameTest
NameTest  = QName / Wildcard
Wildcard  = "*" / (NCName ":" "*") / ("*" ":" NCName)
FilterExpr  = PrimaryExpr:PrimaryExpr PredicateList {return PrimaryExpr;}
PredicateList  = Predicate*
Predicate  = "[" Expr "]"
PrimaryExpr  = Literal / VarRef / ParenthesizedExpr / ContextItemExpr / FunctionCall:FunctionCall {return FunctionCall;}
Literal  = NumericLiteral / StringLiteral
NumericLiteral  = IntegerLiteral / DecimalLiteral / DoubleLiteral
VarRef  = "$" VarName
VarName  = QName
ParenthesizedExpr  = "(" Expr? ")"
ContextItemExpr  = "."
FunctionCall  = funcName:FunctionName "(" args:(ExprSingle ((", " / ",") ExprSingle)*)? ")" {
	console.log("functionName: " + arguments[0]);
	switch(arguments[0]) {
		case 'concat':
			return '<xsl:call-template name="concatFunc">' + arguments[1].join("") + '</xsl:call-template>';
		break;
		case 'current-dateTime':
			return '<xsl:value-of select="$currentDateTime"/>';
		break;
	}
}
FunctionName = "concat" / "current-dateTime"
SingleType  = AtomicType "?"?
SequenceType  = ("empty-sequence" "(" ")") / (ItemType OccurrenceIndicator?)
OccurrenceIndicator  = "?" / "*" / "+"
ItemType  = KindTest / ("item" "(" ")") / AtomicType
AtomicType  = QName
KindTest  = DocumentTest / ElementTest / AttributeTest / SchemaElementTest / SchemaAttributeTest
/ PITest
/ CommentTest
/ TextTest
/ AnyKindTest
AnyKindTest  = "node" "(" ")"
DocumentTest  = "document-node" "(" (ElementTest / SchemaElementTest)? ")"
TextTest  = "text" "(" ")"
CommentTest  = "comment" "(" ")"
PITest  = "processing-instruction" "(" (NCName / StringLiteral)? ")"
AttributeTest  = "attribute" "(" (AttribNameOrWildcard ("," TypeName)?)? ")"
AttribNameOrWildcard  = AttributeName / "*"
SchemaAttributeTest  = "schema-attribute" "(" AttributeDeclaration ")"
AttributeDeclaration  = AttributeName
ElementTest  = "element" "(" (ElementNameOrWildcard ("," TypeName "?"?)?)? ")"
ElementNameOrWildcard  = ElementName / "*"
SchemaElementTest  = "schema-element" "(" ElementDeclaration ")"
ElementDeclaration  = ElementName
AttributeName  = QName
ElementName  = QName
TypeName  = QName
QName = PrefixedName / UnprefixedName
PrefixedName = Prefix ':' LocalPart
UnprefixedName = LocalPart
Prefix = NCName
LocalPart = NCName
NCName = NameStartChar (NameChar)*
NameStartChar =   [:_A-Za-zu00C0-u00D6u00D8-u00F6u00F8-u02FFu0370-u037Du037F-u1FFFu200C-u200Du2070-u218Fu2C00-u2FEFu3001-uD7FFuF900-uFDCFuFDF0-uFFFDu10000-uEFFFF]
NameChar =   NameStartChar / [-.0-9] / [u00B7] / [u0300-u036Fu203F-u2040]
StringLiteral = expr:(('"' ('""' / [^"])* '"') / ("'" ("''" / [^'])* "'")) {return '<xsl:text>' + expr[1].join("") + '</xsl:text>';}
IntegerLiteral = Digits
DecimalLiteral = ("." Digits) / (Digits "." [0-9]*)
DoubleLiteral = (("." Digits) / (Digits ("." [0-9]*)?)) [eE] [+-]? Digits
Digits = [0-9]+