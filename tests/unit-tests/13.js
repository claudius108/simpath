$(document).ready(function() {
	$x.submission({
		"ref" : "simpath:instance('xml-1')",
		"resource" : $x.utils.baseURI
				+ "tests/resources/data-01.xml",
		"mode" : "synchronous",
		"method" : "get"
	});	
	$x.submission({
		"ref" : "simpath:instance('xml-2')",
		"resource" : $x.utils.baseURI
				+ "tests/resources/data-01.xml",
		"mode" : "synchronous",
		"method" : "get"
	});	

	var oIterationNOs = {1 : 1};
	//var oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1};
	var nIterationNo
	, sXPathExpr = //"concat('Desired value is: ', 'da')"
	"concat('Desired value is: ', simpath:instance('xml-1')/*[local-name() = 'mods']/*[local-name() = 'originInfo']/*[local-name() = 'dateIssued'][1], simpath:instance('xml-2')/*[local-name() = 'mods']/*[local-name() = 'originInfo']/*[local-name() = 'dateIssued'][2])"
	//"concat('Desired value is: ', simpath:instance('xml-1')/*/*/*/text(), ' + ', simpath:instance('xml-2')/*/*[1]/text())"
	, oXPathResult
	;
		
	var oXSLTDoc = $x._XSLTtemplates[0];
	$("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.</td>"}).appendTo("#results-1 table");
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			oXPathResult = $x.xpath(sXPathExpr);
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-1 table");
	}
	$("#results-1 div").text(oXPathResult);

	//alert($x.serializeToString($x._XSLTtemplates[0]));

	//$("#results-2 div").text($x.instance('xml').source());
});