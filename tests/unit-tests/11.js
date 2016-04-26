$(document).ready(function() {
	$x.instance('test').submission({
		"resource" : "http://89.33.60.139/tests/simpath/tests/data.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
	var sXPathExpr = "simpath:instance('test')/*[local-name() = 'mods']/*[local-name() = 'identifier']/@displayLabel"
	, nExpr1 = $x.xpath.compile(sXPathExpr)[0]
	, oXPathResult
	, sResultString
	, nIterationNo
	;
	var oIterationNOs = {1 : 1};
	//var oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1};
	$("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.</td>"}).appendTo("#results-1 table");
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			oXPathResult = $x.evaluate(nExpr1);
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-1 table");
	}
	switch(oXPathResult.nodeType) {
		case 1:
			sResultString = $x.serializeToString(oXPathResult);
		break;
		case 2:
			sResultString = "@" + oXPathResult.nodeName + "=\"" + oXPathResult.nodeValue + "\"";
		break;
	}
	$("#results-1 div").text(sResultString);
	oXPathResult = sResultString = "";

	$("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.</td>"}).appendTo("#results-2 table");
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			oXPathResult = $x.xe[nExpr1].evaluate();
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-2 table");
	}
	switch(oXPathResult.nodeType) {
		case 1:
			sResultString = $x.serializeToString(oXPathResult);
		break;
		case 2:
			sResultString = "@" + oXPathResult.nodeName + "=\"" + oXPathResult.nodeValue + "\"";
		break;
	}
	$("#results-2 div").text(sResultString);
	oXPathResult = sResultString = "";

	$("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.</td>"}).appendTo("#results-3 table");
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			//oXPathResult = $x.xe[nExpr1].evaluate22();
			oXPathResult = (new Function("return(function() {" + $x.xe[nExpr1].fXPathResultHandler + "});"))();
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-3 table");
	}
	oXPathResult = oXPathResult();
	switch(oXPathResult.nodeType) {
		case 1:
			sResultString = $x.serializeToString(oXPathResult);
		break;
		case 2:
			sResultString = "@" + oXPathResult.nodeName + "=\"" + oXPathResult.nodeValue + "\"";
		break;
	}
	$("#results-3 div").text(sResultString);
	oXPathResult = sResultString = "";
});

