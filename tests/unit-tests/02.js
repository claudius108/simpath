$(document).ready(function() {
	$x.submission({
		"ref" : "simpath:instance('test')",
		"resource" : $x.utils.baseURI
				+ "tests/resources/data-01.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
	fTest("simpath:instance('test')/*[local-name() = 'mods']/*[local-name() = 'originInfo']/*[local-name() = 'dateIssued'][1]", "set-element-value-results");
        fTest("simpath:instance('test')/*[local-name() = 'mods']/*[local-name() = 'identifier']/@displayLabel", "set-attribute-value-results");
		
                //check for simpath errors
                //if (result.getElementsByTagNameNS("http://kuberam.ro/ns/simpath", "error")[0]) {
                //   throw "Simpath error (simpath-binding-exception): the XPath expression \"" + sXPathExpr + "\" selects a node having element children, and it is not allowed to set the value of such node.";
                //}
});
function fTest(sXPathExpr, sResultDivId) {
	var oIterationNOs = {1 : 1};
	//var oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1};
	var nIterationNo;
	$("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.</td>"}).appendTo("#" + sResultDivId + " table");
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			$x.setvalue(sXPathExpr, "'new value'");
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#" + sResultDivId + " table");
	}
	var oXPathResult = $x.xpath(sXPathExpr)
	, sXPathResult;
	oXPathResult = (oXPathResult[0]) ? oXPathResult[0] : oXPathResult;
	switch(oXPathResult.nodeType) {
		case 1:
			sXPathResult = $x.serializeToString(oXPathResult);
		break;
		case 2:
			sXPathResult = "@" + oXPathResult.nodeName + "=\"" + oXPathResult.nodeValue + "\"";
		break;
	}
	$("#" + sResultDivId + " div").text(sXPathResult);
}