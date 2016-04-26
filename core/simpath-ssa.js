/*
 * Simpath - Simpathetic XPath processor
 * By Claudius Teodorescu
 * Licensed under LGPL.
 */

window.$x = {
	//object holding the data instances
	instances : {},
	sDefaultInstanceId : "",
	instance : function(sInstanceId, oXMLDoc) {
		if (!$x.sDefaultInstanceId) {
			$x.sDefaultInstanceId = sInstanceId;
		}
		if (oXMLDoc) {
			//$x.utils.fCollectNSs( oXMLDoc );
			$x.instances[sInstanceId] = oXMLDoc;
		}
		return {
			sInstanceId : sInstanceId
			, oXMLDoc : $x.instances[sInstanceId]
			, reset : function(sSnapshotId) {
				$x.instances[this.sInstanceId] = $x.parseFromString($x.serializeToString($x.instances[this.sInstanceId + "-" + sSnapshotId]));
			}
			, source : function() {
				return $x.serializeToString(this.oXMLDoc.documentElement);
			}
			, snapshot : function(sSnapshotId) {
				$x.instances[this.sInstanceId + "-" + sSnapshotId] = $x.parseFromString($x.serializeToString(this.oXMLDoc.documentElement));
			}
			, $ : function() {return $(this.oXMLDoc.documentElement);}
		}
	},
	xpath : function(sRefXPathExpr, oXPathContext){
		return $x.xpath.compile(sRefXPathExpr, oXPathContext)[1];
	},
	//object holding the compiled XPath expressions
	xe : {},
	//string containing namespaces
	sNSs : "",
	parseFromString : function(sXMLstring) {
		var oDOMParser = new DOMParser();
		return oDOMParser.parseFromString(sXMLstring, "text/xml");
	},
	serializeToString : function(oXMLDoc) {
		var oXMLSerializer = new XMLSerializer();
		return oXMLSerializer.serializeToString(oXMLDoc);
	},
	setvalue : function(sRefXPathExpr, sValueXPathExpr, oXPathContext) {
		$x.setvalue.compile(sRefXPathExpr, sValueXPathExpr, oXPathContext);
	},
	insert : function() {},
	"delete" : function() {},
	replace : function() {},
	reset : function() {
		$x.instances = {};
		$x.xe = {};
	},
	utils : {
		fCollectNSs : function(oXMLDoc) {
			var sXMLDoc = $x.serializeToString(oXMLDoc)
			, sNSs = $x.sNSs
			;
			sXMLDoc = sXMLDoc.substring(sXMLDoc.indexOf(" "), sXMLDoc.indexOf(">")).split(" ");
			for ( var i = 1, il = sXMLDoc.length; i < il; i++ ) {
				var oNamespace = sXMLDoc[i];
				if (!(oNamespace.substring(0, 6) === "xmlns:")) {continue;}
				if (sNSs.search(oNamespace) == -1) {sNSs += oNamespace.replace(/\"/g, '\"') + " ";};
			}
			$x.sNSs = sNSs;
		}
	},
	_fXPathExprProcessor : function(sRefXPathExpr, oXPathContext) {
		var nXPathExprId = (new Date).getTime()
		;
		//register the object containing the compiled XPath expression e. a.
		$x.xe[nXPathExprId] = {"sRefXPathExpr" : sRefXPathExpr, "fXPathResultHandler" : ""};
		//check if the XPath expression is a 'string'
		if (sRefXPathExpr.indexOf("'") == 0) {
			$x.xe[nXPathExprId].fXPathResultHandler = "return " + sRefXPathExpr;
			return [nXPathExprId, sRefXPathExpr];
		}
		//check for XPath extension function simpath:instance() of Simpath
		//at beginning of XPath expressions, which gives the in-scope evaluation context
		var sInstanceId
		;
		if (sRefXPathExpr.substring(0,18) === "simpath:instance('") {
			sInstanceId = sRefXPathExpr.substring(18, sRefXPathExpr.indexOf(")") - 1);
			sRefXPathExpr = sRefXPathExpr.substring(sRefXPathExpr.indexOf(")") + 1);
		} else {
			sInstanceId = $x.sDefaultInstanceId;
		}
		var sXMLDoc = "$x.instances['" + sInstanceId + "']";
		//check if the XPath expression has a context
		if (oXPathContext) {
			sXMLDoc = "oXPathContext";
		}
		return [nXPathExprId, sRefXPathExpr, sXMLDoc, sInstanceId];
                //.replace( new RegExp( "avg\\(", "gi" ), " \" + window.avg\(\"" )
                //.replace( new RegExp( "\\)", "gi" ), "\") + \"" )
	},
	_fDocFromNode : function(oNode) {
		var oNodeDoc = document.implementation.createDocument("", "", null);
		var oClonedNode = oNodeDoc.importNode(oNode, true);
		oNodeDoc.appendChild(oClonedNode);
		return oNodeDoc;
	},
	XSLTProcessor : function(oXMLDoc, oXSLTDoc) {
		var oXSLTProcessor = new XSLTProcessor();
		oXSLTProcessor.importStylesheet(oXSLTDoc);
		return oXSLTProcessor.transformToFragment(oXMLDoc, document);
	},
	_XSLTtemplates : [],
	_XPathResultFunctions : [],
	_oRegExprs : [/(\/|\/\/)@[a-zA-Z0-9_-]+[:]?[a-zA-Z0-9_-]+[^)|\]]$/, /method=\"xml\"/, /_XPathResultFunctions\[1\]/]
};
$x.xpath.compile = function(sRefXPathExpr, oXPathContext) {
	var oXPathResult
	, oProcessedXPathExpr = $x._fXPathExprProcessor(sRefXPathExpr, oXPathContext)
	, nXPathExprId = oProcessedXPathExpr[0]
	, sProcessedXPathExpr = oProcessedXPathExpr[1]
	, sXMLDoc = oProcessedXPathExpr[2]
	;
	if (sRefXPathExpr.indexOf("'") == 0) {
		return [nXPathExprId, sProcessedXPathExpr];
	}
	//all but sequence of attribute(s)
	var fXPathResultHandler =
		"var oXSLTDoc = $x._XSLTtemplates[0]" +
		", length = oXSLTDoc.childNodes[0].childNodes.length;" +
		"oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute(\"select\", \"" + sProcessedXPathExpr + "\"); " +
		"return $x._XPathResultFunctions[1]($x.XSLTProcessor(" + sXMLDoc + ", oXSLTDoc), '" + nXPathExprId + "');";
	//check if the XPath expression have to return of sequence of attribute(s)
	var nLastStepIndex = sProcessedXPathExpr.search($x._oRegExprs[0]);
	if (nLastStepIndex != -1) {
		var sLastStep = sProcessedXPathExpr.substring(nLastStepIndex)
		, sAttrName = sLastStep.substring(sLastStep.indexOf("@") + 1);
		sProcessedXPathExpr = sProcessedXPathExpr.substring(0, nLastStepIndex);
		fXPathResultHandler =
			"var oXSLTDoc = $x._XSLTtemplates[1]" +
			", length = oXSLTDoc.childNodes[0].childNodes.length; " +
			"oXSLTDoc.childNodes[0].childNodes[length -1].setAttribute(\"match\", \"" + (sProcessedXPathExpr ? sProcessedXPathExpr : "*") + "\"); " +
			"oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].setAttribute(\"select\", \"." + sLastStep + "\"); " +
			"return $x._XPathResultFunctions[0]($x.XSLTProcessor(" + sXMLDoc + ", oXSLTDoc), '" + sAttrName + "');";
	}
	$x.xe[nXPathExprId].fXPathResultHandler = fXPathResultHandler;
	
	$x.xe[nXPathExprId].nXSLTtemplateId = 0;
	$x.xe[nXPathExprId].sProcessedXPathExpr = sProcessedXPathExpr;
	$x.xe[nXPathExprId].sXMLDoc = sXMLDoc;
	$x.xe[nXPathExprId].nXPathExprId = nXPathExprId;
	$x.xe[nXPathExprId].evaluate = function() {
		var oXSLTDoc = $x._XSLTtemplates[this.nXSLTtemplateId]
		, length = oXSLTDoc.childNodes[0].childNodes.length;
		oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute("select", "" + this.sProcessedXPathExpr + "");
		return $x._XPathResultFunctions[0]($x.XSLTProcessor($x.instances['test'], oXSLTDoc), 'displayLabel');
	}
	
	
	try {
		oXPathResult = (new Function("oXPathContext", fXPathResultHandler )(oXPathContext ? $x._fDocFromNode(oXPathContext) : null));
	}
	catch(error) {
		alert("simpath compile error: " + error.description + ",\nfor the following XPath expression: \"" + sRefXPathExpr + "\"");
	}
	return [nXPathExprId, oXPathResult];
};
$x.evaluate = function( nXPathExprId, oXPathContext ) {
	return (new Function("oXPathContext", $x.xe[nXPathExprId].fXPathResultHandler )(oXPathContext ? $x._fDocFromNode(oXPathContext) : null));
};
$x.setvalue.compile = function(sRefXPathExpr, sValueXPathExpr, oXPathContext) {
	var oXPathResult
	, oProcessedXPathExpr = $x._fXPathExprProcessor(sRefXPathExpr, oXPathContext)
	, nXPathExprId = oProcessedXPathExpr[0]
	, sProcessedXPathExpr = oProcessedXPathExpr[1]
	, sXMLDoc = oProcessedXPathExpr[2]
	, sInstanceId = oProcessedXPathExpr[3]
	;
	if (sRefXPathExpr.indexOf("'") == 0) {
		return [nXPathExprId, sProcessedXPathExpr];
	}
	//set value for element
	var fXPathResultHandler =
		"var oXSLTDoc = $x._XSLTtemplates[2]" +
		", length = oXSLTDoc.childNodes[0].childNodes.length; " +
		"oXSLTDoc.childNodes[0].childNodes[length -1].setAttribute(\"match\", \"" + sProcessedXPathExpr + "\"); " +
		"oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[1].childNodes[0].childNodes[1].setAttribute(\"select\", \"" + sValueXPathExpr + "\"); " +
		"$x.instances['" + sInstanceId + "'] = $x._fDocFromNode($x.XSLTProcessor(" + sXMLDoc + ", oXSLTDoc));"
		;
	var nLastStepIndex = sProcessedXPathExpr.search($x._oRegExprs[0]);
	if (nLastStepIndex != -1) {
		var sLastStep = sProcessedXPathExpr.substring(nLastStepIndex);
		sProcessedXPathExpr = sProcessedXPathExpr.substring(0, nLastStepIndex);
		fXPathResultHandler =
			"var oXSLTDoc = $x._XSLTtemplates[3]" +
			", length = oXSLTDoc.childNodes[0].childNodes.length; " +
			"oXSLTDoc.childNodes[0].childNodes[length -1].setAttribute(\"match\", \"" + sProcessedXPathExpr + sLastStep + "\"); " +
			"oXSLTDoc.childNodes[0].childNodes[length -1].childNodes[0].childNodes[0].setAttribute(\"select\", \"" + sValueXPathExpr + "\"); " +
			"$x.instances['" + sInstanceId + "'] = $x._fDocFromNode($x.XSLTProcessor(" + sXMLDoc + ", oXSLTDoc));";
	}
	try {
		oXPathResult = (new Function( fXPathResultHandler )());
	}
	catch(error) {
		alert("simpath compile error for setvalue: " + error.description + ",\nfor the following XPath expression: \"" + sRefXPathExpr + "\"");
	}
	$x.xe[nXPathExprId].fXPathResultHandler = fXPathResultHandler;
	return [nXPathExprId, oXPathResult];
};
//initializing the engine utilities based upon the user agent
if (typeof(DOMParser) == 'undefined') {
	$x.isOldIE = true;
	$x._fSetDOMParser = function() {
		var _DOMParser = new ActiveXObject("Msxml2.DOMDocument");
		_DOMParser.async = false;
		$x._DOMParser = _DOMParser;
	}
	//set the IE DOM Parser (with ActiveX)
	$x._fSetDOMParser();
	$x.parseFromString = function(sXMLstring) {
		$x._DOMParser.loadXML(sXMLstring);
		return $x._DOMParser.cloneNode(true);
	};
	$x.serializeToString = function(oXMLDoc) {return oXMLDoc.xml;};
}
if (typeof(XSLTProcessor) == 'undefined') {
	$x.XSLTProcessor = function(oXMLDoc, oXSLTDoc) {
		return $x.parseFromString(oXMLDoc.transformNode(oXSLTDoc));
	};
	$x._fDocFromNode = function(oNode) {
		return $x.parseFromString($x.serializeToString(oNode));
	}
}
//collection of namespaces for base document
if (document.namespaces) {
	var sXMLDoc = document.documentElement.outerHTML;
	sXMLDoc = "<html" + sXMLDoc.substring(sXMLDoc.indexOf("<HTML") + 5, sXMLDoc.indexOf("<HEAD"))+ "</html>";
	var oXMLDoc = $x.parseFromString(sXMLDoc);
	$x.utils.fCollectNSs(oXMLDoc);
} else {
	$x.utils.fCollectNSs(document.documentElement);
}
//set some global strings
$x.utils._sXSLTStartTag = "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" xmlns:simpath=\"http://kuberam.ro/ns/simpath\" xmlns:msxsl=\"urn:schemas-microsoft-com:xslt\" " + $x.sNSs + "><xsl:output method=\"xml\"/>";
$x.utils._sXSLTidentityTemplate = "<xsl:template match=\"node()|@*\"><xsl:copy><xsl:apply-templates select=\"node()|@*\"/></xsl:copy></xsl:template>";
if (typeof(XSLTProcessor) == 'undefined') {
	//modify the XSLT output method
	$x.utils._sXSLTStartTag = $x.utils._sXSLTStartTag.replace($x._oRegExprs[1], "method=\"html\"");
}
(function() {
	var utils = $x.utils
	//XSLT template for all XPath expressions but attributes sequence
	, sXSLTAllTemplate =
		utils._sXSLTStartTag +
		"<xsl:template match=\"/\"><simpath:xpath-result><xsl:copy-of select=\"\"/></simpath:xpath-result></xsl:template>" +
		"</xsl:stylesheet>"
	//XSLT template for attributes sequence
	, sXSLTAttrSeqTemplate =
		utils._sXSLTStartTag +
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
	//XSLT template for setvalue() function
	, sXSLTsetElementValueTemplate =
		utils._sXSLTStartTag + utils._sXSLTidentityTemplate + "<xsl:template match=\"\"><xsl:choose><xsl:when test=\"*\"><simpath:error type=\"simpath-binding-exception\"/></xsl:when><xsl:otherwise><xsl:copy><xsl:copy-of select=\"@*\"/><xsl:value-of select=\"\"/></xsl:copy></xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>"
	, sXSLTsetAttributeValueTemplate =
		utils._sXSLTStartTag + utils._sXSLTidentityTemplate + "<xsl:template match=\"\"><xsl:attribute name=\"{name(.)}\"><xsl:value-of select=\"\"/></xsl:attribute></xsl:template></xsl:stylesheet>"
	;
	$x._XSLTtemplates.push($x.parseFromString(sXSLTAllTemplate));
	$x._XSLTtemplates.push($x.parseFromString(sXSLTAttrSeqTemplate));
	$x._XSLTtemplates.push($x.parseFromString(sXSLTsetElementValueTemplate));
	$x._XSLTtemplates.push($x.parseFromString(sXSLTsetAttributeValueTemplate));
	//function for outputting XPath result consisting of attribute(s) sequence
	$x._XPathResultFunctions[0] = function(oXPathResult, sAttrName) {
		var items = oXPathResult.childNodes[0].childNodes;
		var aItems = new Array();
		for ( var i = 0, il = items.length; i < il; i++ ) {
			var attribute = document.createAttribute(sAttrName);
			attribute.nodeValue = items[i].getAttribute(sAttrName);
			aItems.push(attribute);
		}
		if (aItems.length == 1) {
			return aItems[0];
		} else {
			return aItems;
		}
	};
	//function for compiling XPath result consisting of any item but attribute(s) sequence
	$x._XPathResultFunctions[1] = function(oXPathResult, nXPathExprId) {
		var fXPathResultHandler = $x.xe[nXPathExprId].fXPathResultHandler;
		//case when the result is string, boolean, or number
		if (oXPathResult.childNodes[0].childNodes[0].nodeType == 3) {
			$x.xe[nXPathExprId].fXPathResultHandler = fXPathResultHandler.substring(0, fXPathResultHandler.indexOf('return')) + "return " + fXPathResultHandler.substring(fXPathResultHandler.indexOf('$x.XSLTProcessor('), fXPathResultHandler.indexOf('oXSLTDoc)')) + "oXSLTDoc).childNodes[0].childNodes[0].nodeValue;";
			return oXPathResult.childNodes[0].childNodes[0].nodeValue;
		} else {//case when the result is a sequence of nodes
			$x.xe[nXPathExprId].fXPathResultHandler = fXPathResultHandler.substring(0, fXPathResultHandler.indexOf('return')) + "return " + fXPathResultHandler.substring(fXPathResultHandler.indexOf('$x.XSLTProcessor('), fXPathResultHandler.indexOf('oXSLTDoc)')) + "oXSLTDoc).childNodes[0].childNodes;";
			return oXPathResult.childNodes[0].childNodes;
		}
	};
})();