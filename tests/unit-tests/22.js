$(document).ready(function() {

	var simparser = $x2._parser;
	
	//load XML file
	$x.submission({
		"ref" : "simpath:instance('xml-1')",
		"resource" : "../data/data-03.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
	//load XSLT file
	$x.submission({
		"ref" : "simpath:instance('xml2soma')",
		"resource" : $x.utils.baseURI + "core/xml2soma.xml",
		"mode" : "synchronous",
		"method" : "get"
	});
	var $instance1a = $x.transform($x._instances['xml-1'], $x._instances['xml2soma']);
	$x.instance('xml-1-soma').load($instance1a);
	
	$instance1 = $x2.sequence($instance1a);
	$x.variables['instance-1'] = $instance1;
	
	var $expr1string = simparser.parse("$instance-1~_simpathPath(\"element[name = 'dw:document-root'] > element[name = 'dw:input']\")");
	
	var $expr1 = (new Function("expr", "return expr;"))(simparser.parse("$instance-1~_simpathPath(\"element[name = 'dw:document-root'] > element[name = 'dw:input']\")")); 
		
	//alert($expr1.length);

	for (prop in $expr1) {
		//alert(prop + ": " + $expr1[prop]);
	}
	
	//alert($expr1 instanceof Array);
	
	var result22 = Array.prototype.slice.call($instance1a.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']"));
	var result40 = Array.prototype.slice.call($instance1a.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']"));
	result22[3] = result40[0];
	//alert(result22[0] instanceof Element);
	
	
	
	
	//definition of XPath expression object
	function xpathExprImpl(sRefXPathExpr, oXPathContext) {
		this.sRefXPathExpr = sRefXPathExpr;
		this.context = oXPathContext;
		this.evaluate = function() {
			return this.sRefXPathExpr;
		}
	}
	
	//definition of general functions
	var slice = Array.prototype.slice;
	var forEach = Array.prototype.forEach;
	
	function createSequence(sequenceItems) {
		var sequence = document.createElementNS("http://www.w3.org/1999/xhtml", "sequence");
		for (var i = 0, il = sequenceItems.length; i < il; i++) {
	            var itemElement = document.createElementNS("http://www.w3.org/1999/xhtml", sequenceItems[i][0]);
	            itemElement.setAttribute("string-value", sequenceItems[i][1]);
	            sequence.appendChild(itemElement);
		}		
		var sequenceObj = new sequenceImpl();
		sequenceObj.sequence = sequence;
	    return sequenceObj;	
	}
	
	//alert(createSequence([["integer", "22"], ["integer", "17"]]).serializeToString());
	
	
	var $instance1 = $x._instances['xml-1-soma'].childNodes[0].childNodes[0];
	resultGlobal = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']");
	
	JSLitmus.test('Compile $instance-1~_simpathPath("element[name = \'dw:document-root\'] > element[name = \'dw:input\']")', function(count) {
		while (count--) {
			var result = simparser.parse("$instance-1~_simpathPath(\"element[name = 'dw:document-root'] > element[name = 'dw:input']\")");
		}
	});
	
	JSLitmus.test('Evaluate $instance-1~_simpathPath("element[name = \'dw:document-root\'] > element[name = \'dw:input\']")', function(count) {
		while (count--) {
			var result = $expr1;
		}
	});


	JSLitmus.test('Construct sequence from literal', function(count) {
		while (count--) {
			var sequence = createSequence([["integer", "22"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"], ["integer", "17"]]).items();
		}
	});
	
	JSLitmus.test('/dw:document-root/dw:input', function(count) {
		while (count--) {
			var result = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']");
		}
	});

	JSLitmus.test("Convert NodeList to array for '/dw:document-root/dw:input'", function(count) {
		while (count--) {
			var result = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']");
		}
	});	
	
	JSLitmus.test('/dw:document-root/dw:input[1]', function(count) {
		while (count--) {
			var result = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']")[0];
		}
	});
	
	JSLitmus.test('/dw:document-root/dw:input[position() = 2]', function(count) {
		while (count--) {
			var result = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']")[1];
		}
	});	

	JSLitmus.test('/dw:document-root/dw:input[position() <= 2]', function(count) {
		while (count--) {
			var $result1 = slice.call($instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']"), 0, 2);
		}
	});	
	
	JSLitmus.test('/dw:document-root/dw:input[position() <= 3]/dw:item[position() <= 2]', function(count) {
		while (count--) {
			var $result1 = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']");
			var $result1string = "", startPos = 0, endPos = 3;
			for (var i = startPos, il = endPos; i < il; i++) {
			    $result1string += "#" + $result1[i].id + " > dw-item, ";
			}
			$result1string = $result1string.substring(0, $result1string.lastIndexOf(', '));
			var $result1string = "", startPos = 0, endPos = 2;
			for (var i = startPos, il = endPos; i < il; i++) {
			    $result1string += "#" + $result1[i].id + ", ";
			}
			$result1string = $result1string.substring(0, $result1string.lastIndexOf(', '));
			var $result = $instance1.querySelectorAll($result1string);
		}
	});	
	
	
	
	
	
	
	
	
	
	JSLitmus.test('/dw:document-root/dw:input[last()]', function(count) {
		while (count--) {
			var result = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']:nth-child(3)");
		}
	});	
	
	JSLitmus.test('/dw:document-root/dw:input[position() = last()]', function(count) {
		while (count--) {
			var result = $instance1.querySelectorAll("element[name = 'dw:document-root'] > element[name = 'dw:input']:nth-child(3)");
		}
	});
	
});

//NOTES
//1. Tests with span as place-holders showed that the speed is the same as with constructed elements as place-holders.
//2. Function position() don't works as attribute of SOMA element. 
