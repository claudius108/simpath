$(document).ready(function() {
	function loadXMLDoc(dname) {
		xhttp = new XMLHttpRequest();
		xhttp.open("GET", dname, false);
		xhttp.send("");
		return xhttp.responseXML;
	}
	var xml = loadXMLDoc("../data/AST.xml")
		, xsl = loadXMLDoc("../data/AST.xsl")
		, xsltProcessor = new XSLTProcessor()
	;
	oSequence = $x.parseFromString(
			"<simpath:sequence xmlns:simpath=\"http://kuberam.ro/ns/simpath\">" +
				"<simpath:item>2</simpath:item>" +
				"<simpath:item>2.2</simpath:item>" +
			"</simpath:sequence>"
		)
		;
	xsltProcessor.importStylesheet(xsl);
	var resultDocument = xsltProcessor.transformToDocument(xml);
	alert(resultDocument.documentElement.textContent);
// 	alert($x.serializeToString(resultDocument));
	var oItems = oSequence.documentElement.childNodes
		, i = oItems.length
	;
	while (i--) {
		oItems[i].typedValue = Number(oItems[i].textContent);
		oItems[i].type = 'xs:untyped';
		oItems[i].root = oSequence;
	}

	function element(oSequence) {
		var sum = 0
			, oItems = oSequence.documentElement.childNodes
			, i = oItems.length
		;
		while (i--) {
			sum += oItems[i].typedValue;
		}

// 		for (var i = 0, il = oItems.length; i < il; i++) {
// 			sum = sum + Number(oItems[i].textContent);
// 		}
		return sum;
	}

	function unaryPlusOp(oSequence) {
		var sum = 0
			, oItems = oSequence.documentElement.childNodes
			, i = oItems.length
		;
		while (i--) {
			sum += oItems[i].typedValue;
		}

// 		for (var i = 0, il = oItems.length; i < il; i++) {
// 			sum = sum + Number(oItems[i].textContent);
// 		}
		return sum;
	}

	//alert(unaryPlusOp(oSequence));
	
	JSLitmus.test('Native XSLT speed', function(count) {
		while (count--) {
			var xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(xsl);
			var resultDocument = xsltProcessor.transformToDocument(xml);
		}
	});
	JSLitmus.test('JS AST', function(count) {
		while (count--) {
			var result = unaryPlusOp(oSequence);

		}
	});

});