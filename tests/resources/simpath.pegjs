XPath = expr:Expr {return expr;}
Expr = 	exprSingle:ExprSingle ("," ExprSingle)* {return exprSingle;}
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
UnaryExpr  = UnaryOp:(("-" / "+")*) ValueExpr:(ValueExpr) {return UnaryOp + ValueExpr;}
ValueExpr  = expr:PathExpr {return expr;}
GeneralComp  = "=" / "!=" / "<" / "<=" / ">" / ">="
ValueComp  = "eq" / "ne" / "lt" / "le" / "gt" / "ge"
NodeComp  = "is" / "<<" / ">>"
PathExpr  = (LeadingSingleSlash RelativePathExpr?) / (DoubleSlash RelativePathExpr) / RelativePathExpr
LeadingSingleSlash = "/" {return "";}
RelativePathExpr  = stepExpr:(StepExpr) furtherStepExprs:(FurtherStepExpr*) {return stepExpr + furtherStepExprs;}
FurtherStepExpr = stepSeparator:((SingleSlash / DoubleSlash)) stepExpr:StepExpr {return stepSeparator + stepExpr;}
SingleSlash = "/" {return " > ";}
DoubleSlash = "//" {return " ";}
StepExpr  = expr:(FilterExpr / AxisStep) {return expr.join("");}
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
FilterExpr  = expr:(PrimaryExpr PredicateList) {return expr;}
PredicateList  = Predicate*
Predicate  = "[" Expr "]"
PrimaryExpr  = primaryExpr:(Literal / VarRef (EngineFunctionCall)? / ParenthesizedExpr / ContextItemExpr / FunctionCall) {return primaryExpr.join("");}
Literal  = NumericLiteral / StringLiteral
NumericLiteral  = IntegerLiteral / DecimalLiteral / DoubleLiteral
VarRef  = "$" varName:VarName "~" {return "$x.variables['" + varName + "']";}
VarName  = QName
ParenthesizedExpr  = "(" Expr? ")"
ContextItemExpr  = "."
FunctionCall  = FunctionName "(" args:(ExprSingle ("," [\s] ExprSingle)*)? ")" {
	var result = "";
console.log(arguments.callee);
//console.log("arguments: " + arguments[0].join(""));
	for (var i = 0, il = args.length; i < il; i++) {
                //console.log(args[i]);
		result += args[i];
	}
	return result;
}
EngineFunctionCall = engineFunctionName:("_simpathPath" / "simpathFilter") "(" args:(StringLiteral) ")" {
return "." + engineFunctionName + "(\"" + args + "\")";
}

FunctionName = funcName:("concat" / "current-dateTime") {return funcName;}
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
PrefixedName = expr:(Prefix ':' LocalPart) {return expr[1].join("");}
UnprefixedName = LocalPart
Prefix = NCName
LocalPart = NCName
NCName = NameStartChar:(NameStartChar) NameChar:((NameChar)*) {return NameStartChar + NameChar.join("");}
NameStartChar =   [:_A-Za-zu00C0-u00D6u00D8-u00F6u00F8-u02FFu0370-u037Du037F-u1FFFu200C-u200Du2070-u218Fu2C00-u2FEFu3001-uD7FFuF900-uFDCFuFDF0-uFFFDu10000-uEFFFF]
NameChar =   NameStartChar / [-.0-9] / [u00B7] / [u0300-u036Fu203F-u2040]
StringLiteral = expr:(('"' ('""' / [^"])* '"') / ("'" ("''" / [^'])* "'")) {return expr[1].join("");}
IntegerLiteral = Digits
DecimalLiteral = ("." Digits) / (Digits "." [0-9]*)
DoubleLiteral = (("." Digits) / (Digits ("." [0-9]*)?)) [eE] [+-]? Digits
Digits = [0-9]+