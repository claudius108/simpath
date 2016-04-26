$(document).ready(function() {
	$x.submission({
		"ref" : "simpath:instance('test')",
		"resource" : $x.utils.baseURI
				+ "tests/resources/data-01.xml",
		"mode" : "synchronous",
		"method" : "get"
	});	
		
	for (var i=0; i<1000; i++) {
		$x.xe[(new Date).getTime()] = {"oXSLTDoc" : $x._XSLTtemplates[0]};
	}
	var  fXPathResultHandler =
		"var oXSLTDoc = $x._XSLTtemplates[0]," +
		"length = oXSLTDoc.childNodes[0].childNodes.length;" +
		"oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute(\"select\", \"//*[local-name() = 'dateIssued']\");" +
		"oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute(\"select\", \"new value\");"
	, sXSLTAttrSeqTemplate =
		$x.utils._sXSLTStartTag +
			"<xsl:template match=\"/\">" +
				"<simpath:xpath-result>" +
					"<xsl:apply-templates/>" +
				"</simpath:xpath-result>" +
			"</xsl:template>" +
			"<xsl:template match=\"text()\"/>" +
			"<xsl:template match=\"\">" +
				"<xsl:for-each select=\"\">" +
					"<xsl:element name=\"simpath:item\">" +
						"<xsl:copy-of select=\".\"/>" +
					"</xsl:element>" +
				"</xsl:for-each>" +
			"</xsl:template>" +
		"</xsl:stylesheet>"		
	;
	var oIterationNOs = {1 : 1};
	var oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1};
	var nIterationNo;
		
	var oXSLTDoc = $x._XSLTtemplates[0];
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			var length = oXSLTDoc.childNodes[0].childNodes.length;
			oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute("select", "//*[local-name() = 'dateIssued']");
			oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute("select", "new value");
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-1 table");
	}
	var sResult = $x.serializeToString($x._XSLTtemplates[0]);
	$("#results-1 div").text(sResult);
		
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			var oXPathResult = (new Function(  fXPathResultHandler )());
		}
		$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-2 table");
	}
	var sResult = $x.serializeToString($x._XSLTtemplates[0]);
	$("#results-2 div").text(sResult);		
});