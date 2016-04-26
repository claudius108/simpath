$(document).ready(function() {
	$x.submission({
		"ref" : "simpath:instance('test')",
		"resource" : "http://127.0.0.1/web-apps/tests/simpath/tests/data-01.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
        fTest("simpath:instance('test')//*[local-name() = 'dateIssued']", "results-1");
});
function fTest(sXPathExpr, sResultDivId) {
    var oIterationNOs = {1 : 1}
    //var oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1}
    , oXPathResult = ""
    , sXPathResult = ""
	, nIterationNo
	;
    $("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.</td>"}).appendTo("#" + sResultDivId + " table");
    for (nIterationNo in oIterationNOs) {
        var start = new Date().getTime();
        for ( var i = 0, il = nIterationNo; i < il; i++ ) {
            oXPathResult = $x.xpath(sXPathExpr);
        }
        $("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#" + sResultDivId + " table");
    }
    $(oXPathResult).each(function() {
        $("<div/>").appendTo("#results-1 > div").text($x.serializeToString(this));
    });
}