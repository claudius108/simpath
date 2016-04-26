$(document).ready(function() {
	$x.instance('test').submission({
		"resource" : "http://89.33.60.139/tests/simpath/tests/data.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
        fTest("simpath:instance('test')//*[local-name() = 'note']/@transliteration", "results-1");
        fTest("simpath:instance('test')//*[local-name() = 'name']//@type", "results-2");
        fTest("simpath:instance('test')//@type", "results-3");
});
function fTest(sXPathExpr, sResultDivId) {
    var oIterationNOs = {1 : 1}
    //var oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1}
    , oXPathResult = ""
    , sXPathResult = "";
    for (nIterationNo in oIterationNOs) {
        var start = new Date().getTime();
        for ( var i = 0, il = nIterationNo; i < il; i++ ) {
            oXPathResult = $x.xpath(sXPathExpr);
        }
        $("<tr/>", {"html" : "<td><span style=\"color: green; font-weight: bold;\">XPath expression: \"" + sXPathExpr + "\"</span>.<br/>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#" + sResultDivId + " table");
    }
    $(oXPathResult).each(function() {
        sXPathResult += "@" + this.nodeName + "=\"" + this.nodeValue + "\"<br/>";
    });
    $("#" + sResultDivId + " div").html(sXPathResult);
}