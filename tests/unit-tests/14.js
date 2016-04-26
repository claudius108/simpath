$(document).ready(function() {

	//document.evaluate('//H4', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.color = 'red';
	$x.instance('xml-1').load($x.parseFromString("<item1><item11/><item12/></item1>"));
	$x.submission({
		"ref" : "simpath:instance('data')",
		"resource" : "data-02.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
	$x.submission({
		"ref" : "simpath:instance('soma')",
		"resource" : $x.utils.baseURI + "core/xml2soma.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
	//var sInstance = $x.transform($x._instances['data'], $x._instances['soma']).documentElement.firstChild.textContent;

// 	alert(String('[["item1",[["item11",[],1,""],["item12",[],1,""]],1,""]]')[0]);
// 	'[
// 		[
// 		"item1",
// 		[
// 			["item11",[],1,""],
// 			["item12",[],1,""],],1,""],]'

	//$x._instances['data-02'] = JSON.parse(sInstance);

	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun /*, thisp */) {
			"use strict";

			if (this === void 0 || this === null) throw new TypeError();
	
			var t = Object(this);
			var len = t.length >>> 0;
			if (typeof fun !== "function") throw new TypeError();
	
			var res = [];
			var thisp = arguments[1];
			for (var i = 0; i < len; i++) {
				if (i in t) {
					var val = t[i]; // in case fun mutates this
					if (fun.call(thisp, val, i, t)) res.push(val);
				}
			}

			return res;
		};
	}
	oSequence = [
		[
			"item1",
			[
				["kert:item11", [["item111", [["@attribute1", [], 2]], 1], ["item111", [], 1]], 1],
				["item12", [], 1]
			],
			9
		]
	];
	Array.prototype.element = function(sElementName, sElementType) {
		var oArray = this;
		return oArray[0][1].filter(function(element, index, array) {
			return element[0] == sElementName;
		});
	};

	$x.fn['simpath:instance'] = function(sInstanceId) {return $x._instances[sInstanceId]};

	var oXPathResult
	, sRefXPathExpr = "simpath:instance('xml-1')/item1/item11/item111"
	, sRefXPathExpr2 = "simpath:instance('data')/kert:item11/item111"
	, sRefXPathExpr3 = "simpath:instance('data-02')/item11"
	, sRefXPathExpr4 = "count(simpath:instance('xml-1')/kert:item11/item111/@attribute1)"
	;
	
	JSLitmus.test('Native XPath speed', function(count) {
		while (count--) {
			var oXML = $x._instances['data'];
			var oResult = oXML.evaluate('//*', oXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}
	});
	JSLitmus.test('Native XSLT speed', function(count) {
		while (count--) {
// 			var oXSLTProcessor = new XSLTProcessor();
// 			oXSLTProcessor.importStylesheet($x._instances['soma']);
// 			var oResult = oXSLTProcessor.transformToDocument($x._instances['data']);
			var oResult = $x.transform($x._instances['data'], $x._instances['soma']);
		}
	});
	JSLitmus.test('JSON parse', function(count) {
		while (count--) {
			JSON.parse("[[\"item1\", [], 2, 3]]");
		}
	});
	JSLitmus.test('Simpath current way', function(count) {
		while (count--) {
			var oXPathResult = $x.xpath("simpath:instance('xml-1')/item1/item11");
// 			$("#results-1").text($x.serializeToString(oXPathResult[0]));
		}
	});
	JSLitmus.test('XDM - select element', function(count) {
		while (count--) {
			var oProcessedXPathExpr = sRefXPathExpr2.split('/')
			, oCompiledXPathExpr = ''
			, sInstanceId
			;
			if (sRefXPathExpr2.substring(0, 17) === "simpath:instance(") {
				sInstanceId = sRefXPathExpr.substring(18, sRefXPathExpr.indexOf(")") - 1);
				sRefXPathExpr = sRefXPathExpr.substring(sRefXPathExpr.indexOf(")") + 1);
				//delete the first item of oCompiledXPathExpr, containing the simpath:instance() function
				oProcessedXPathExpr.splice(0, 1);
			} else {
				sInstanceId = $x.sDefaultInstanceId;
			}
// 			oCompiledXPathExpr = $x.fn['simpath:instance'](sInstanceId);
			oCompiledXPathExpr = oSequence;
			for (i = 0, il = oProcessedXPathExpr.length; i < il; i++) {
				oCompiledXPathExpr = oCompiledXPathExpr.element(oProcessedXPathExpr[i]);
			}
// 			$("#results-2").text(oCompiledXPathExpr.toString());
		}
	});
	JSLitmus.test('XDM - select attribute', function(count) {
		while (count--) {
			var oProcessedXPathExpr = sRefXPathExpr3.split('/')
			, oCompiledXPathExpr = ''
			, sInstanceId
			;
			if (sRefXPathExpr3.substring(0, 17) === "simpath:instance(") {
				sInstanceId = sRefXPathExpr.substring(18, sRefXPathExpr.indexOf(")") - 1);
				sRefXPathExpr = sRefXPathExpr.substring(sRefXPathExpr.indexOf(")") + 1);
				//delete the first item of oCompiledXPathExpr, containing the simpath:instance() function
				oProcessedXPathExpr.splice(0, 1);
			} else {
				sInstanceId = $x.sDefaultInstanceId;
			}
// 			oCompiledXPathExpr = $x.fn['simpath:instance'](sInstanceId);
			oCompiledXPathExpr = oSequence;
			for (i = 0, il = oProcessedXPathExpr.length; i < il; i++) {
				oCompiledXPathExpr = oCompiledXPathExpr.element(oProcessedXPathExpr[i]);
			}
// 			$("#results-3").text(oCompiledXPathExpr.toString());
		}
	});

			var sStructuralIndex =
				 "*" + "/root/a/b/c" + "*" +
				"*" + "/root/a/b/c" + "*" +
				"*" + "/root/a/b/d" + "*" +
				"*" + "/root/a/b" + "*" +
				"*" + "/root/a/b" + "*" +
				"*" + "/root/a/b" + "*" +
				"*" + "/root/a" + "*" +
				"*" + "/root/a" + "*" +
				"*" + "/root" + "*"
			, sXPathExpr = "/root/a/b/c"
			, oResult = sStructuralIndex.match(new RegExp(sXPathExpr, "g"))
			;
			//alert(oResult.length);
	JSLitmus.test('Regexp for XPath path', function(count) {
		while (count--) {
			var sStructuralIndex =
				 "*" + "/root/a/b/c" + "*" +
				"*" + "/root/a/b/c" + "*" +
				"*" + "/root/a/b/d" + "*" +
				"*" + "/root/a/b" + "*" +
				"*" + "/root/a/b" + "*" +
				"*" + "/root/a/b" + "*" +
				"*" + "/root/a" + "*" +
				"*" + "/root/a" + "*" +
				"*" + "/root" + "*"
			, sXPathExpr = "/root/a/b/c"
			, oResult = sStructuralIndex.match(new RegExp(sXPathExpr, "g"))
			;
		}
	});

// 			alert(sRefXPathExpr4.match(/^(\/\/?|\.\.?|@)\s*/, 1));
			
// 			var oProcessedXPathExpr = sRefXPathExpr3.split('/')
// 			, oCompiledXPathExpr
// 			, sInstanceId
// 			;
// 			if (sRefXPathExpr3.substring(0, 17) === "simpath:instance(") {
// 				sInstanceId = sRefXPathExpr.substring(18, sRefXPathExpr.indexOf(")") - 1);
// 				sRefXPathExpr = sRefXPathExpr.substring(sRefXPathExpr.indexOf(")") + 1);
// 				//delete the first item of oCompiledXPathExpr, containing the simpath:instance() function
// 				oProcessedXPathExpr.splice(0, 1);
// 			} else {
// 				sInstanceId = $x.sDefaultInstanceId;
// 			}
// 			oCompiledXPathExpr = $x.fn['simpath:instance'](sInstanceId);
// 			for (i = 0, il = oProcessedXPathExpr.length; i < il; i++) {
// 				var sStepName = oProcessedXPathExpr[i];
// 				oCompiledXPathExpr = oCompiledXPathExpr.element(oProcessedXPathExpr[i]);
// 			}
// 
// 			alert(oCompiledXPathExpr[0]);
});