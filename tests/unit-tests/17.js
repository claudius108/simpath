$(document).ready(function() {

	var sRefXPathExpr1 = "/root/a/b/c"
	, oSimpleObject = {}
	, oSimpleArray = []
	;

// XML document
// 	<root>1 (0001)
// 		<a>1.1 (000100001)
// 			<b>1.1.1 (00010000100001)
// 				<c>22</c>1.1.1.1 (0001000010000100001),
// 			</b>
// 		<d>1.2 (000100010)
// 			<b>1.2.1 (00010001000001)
// 				<c>17</c>1.2.1.1 (0001000100000100001),
// 			</b>
//			<b/>1.2.2 (00010001100011)
// 			<c/>1.2.3 (00010001100100)
// 		</d>
// 	</root>

	var oSequence = {
		'1' : ['/root', 'root'],
		'1.1' : ['/root/a', 'a'],
		'1.1.1' : ['/root/a/b', 'b'],
		'1.1.1.1' : ['/root/a/b/c', 'c'],
		'1.2.1' : ['/root/d/b', 'b'],
		'1.2.1.1' : ['/root/d/b/c', 'c'],
		'1.2.2' : ['/root/d/b', 'b'],
		'1.2.3' : ['/root/d/c', 'c'],
		'1.2' : ['/root/d', 'd']
	}
	, oPathIndex = {
		'/root/a/b/c' 	: '1-1.1-1.1.1-1.1.1.1',
		'/root/d/b/c' 	: '1-1.2-1.2.1-1.2.1.1',
		'/root/d/b' 	: '1-1.2-1.2.2',
		'/root/d/c' 	: '1-1.2-1.2.3'
	}
	, oStructuralIndex1 = 
		{
			'root' : [
					[
						[0001]
					],
					0001
				],
			'a' 	: [
					[
						[000100001, 0001]
					],
					000100001
				],
			'b' 	: [
					[
						[00010000100001, 000100001, 0001],
						[00010001000001, 000100010, 0001],
						[00010001100011, 000100011, 0001]
					],
					00010000100001|00010001000001|00010001100011
				],
			'c' 	: [
					[
						[0001000010000100001, 00010000100001, 000100001, 0001],
						[0001000100000100001, 00010001000001, 000100010, 0001],
						[00010001100100, 000100011, 0001]
					],
					0001000010000100001|0001000100000100001|00010001100100
				],
			'd' 	: [
					[
						[000100010, 0001]
					],
					000100010
				]
		}
	;
			var oResultPathIndex = [];
			var oRegExp = new RegExp(sRefXPathExpr1);
			for (var item in oSequence) {
// 				alert(oSequence[item][0]);
				if ((oSequence[item][0]).search(oRegExp) != -1) {
					oResultPathIndex.push(item);
				}
			}
// 			alert(oResultPathIndex);

	for (i = 0, il = 1007; i < il; i++) {
		oSimpleObject[i] = (new Date).getTime();
		oSimpleArray.push(i);
	}
	JSLitmus.test('Path index', function(count) {
		while (count--) {
			var oResultPathIndex = [];
			var oRegExp = new RegExp(sRefXPathExpr1);
			for (var item in oSequence) {
				if ((oSequence[item][0]).search(oRegExp) != -1) {
					oResultPathIndex.push(item);
				}
			}
		}
	});

	JSLitmus.test('Select a sequence of 22 items from<br/>a sequence with 1008 items', function(count) {
		while (count--) {
			var oResult = [];
			for (i = 0, il = 21; i < il; i++) {
				oResult.push(oSimpleObject[i]);
			}
		}
	});

	JSLitmus.test('Get element in structural index', function(count) {
		while (count--) {
			var a = oStructuralIndex1['c'];
		}
	});




			var oProcessedXPathExpr = sRefXPathExpr1.split('/')
			, nLocationStepsNumber = oProcessedXPathExpr.length - 1
			, oParentItems = []
			;
			//get the initial sequence
			var oResult = oStructuralIndex1[oProcessedXPathExpr[nLocationStepsNumber]][0]
			, oResultAggregatedIndexes = oStructuralIndex1[oProcessedXPathExpr[nLocationStepsNumber]][1]
			;			
			//get the parent items
			for (var i = nLocationStepsNumber - 1, il = 0; i > il; i--) {
				var oSequence = oStructuralIndex1[oProcessedXPathExpr[i]];
				oParentItems.push(oSequence[1]);
			}
			var nParentItemsLength = oParentItems.length;
			for (var i = 0, il = oResult.length; i < il; i++) {
				var oResultItem = oResult[i];
				if (oResultItem.length - 1 != nParentItemsLength) {
					oResult[i] = '';
					continue;
				}
				for (var j = 0, jl = nParentItemsLength; j < jl; j++) {
					var oSequenceItem = oResultItem[j + 1];
					//check for parenthood
					if (((oParentItems[j]) & (oSequenceItem)) >= (oSequenceItem) != true) {
						oResult[i] = '';
						break;
					}
				}
			}
			var oFilteredResult = [];
			for (var i = 0, il = oResult.length; i < il; i++) {
				if (oResult[i]) {
					oFilteredResult.push(oResult[i]);
				}
			}
// 			alert(Number(oFilteredResult[0][0]).toString(2));


	JSLitmus.test('Generate binary number<br/>with parseInt()', function(count) {
		while (count--) {
			var a = parseInt("00010000111000", 2);
		}
	});
	JSLitmus.test('Compare with bit mask', function(count) {
		while (count--) {
			var a = new Boolean(((oStructuralIndex1['c'][1]) & (00010000100001)) >= (00010000100001));
		}
	});
	JSLitmus.test('Split an XPath expression', function(count) {
		while (count--) {
			var oProcessedXPathExpr = sRefXPathExpr1.split('/');
		}
	});
	JSLitmus.test('Convert an XPath expression to an array', function(count) {
		while (count--) {
			JSON.parse("[\"" + sRefXPathExpr1.replace(/\//g, "\", \"") + "\"]");
		}
	});
	
	(Array.prototype.filter=function(a,b,c,d,e){c=this;d=[];for(e in c)~~e+''==e&&e>=0&&a.call(b,c[e],+e,c)&&d.push(c[e]);return d})
	
	JSLitmus.test('Test filter() method of Array()<br/>(array with 1008 items)', function(count) {
		while (count--) {
			function greaterThanFive(element, index, array) {
				return (element > 5)
			}
			var result = oSimpleArray.filter(greaterThanFive);
		}
	});
	JSLitmus.test('Get initial sequence', function(count) {
		while (count--) {
			var oProcessedXPathExpr = sRefXPathExpr1.split('/')
			, nLocationStepsNumber = oProcessedXPathExpr.length - 1
			, oParentItems = ""
			;
			//get the initial sequence
			var nInitialSequenceIndex = oProcessedXPathExpr[nLocationStepsNumber]
			, oResult = oStructuralIndex1[nInitialSequenceIndex];
		}
	});
	JSLitmus.test('Compile simple XPath expression<br/>(obtaining of path in SOMA)', function(count) {
		while (count--) {
			var oProcessedXPathExpr = sRefXPathExpr1.split('/')
			, nLocationStepsNumber = oProcessedXPathExpr.length - 1
			, oParentItems = []
			;
			//get the initial sequence
			var oResult = oStructuralIndex1[oProcessedXPathExpr[nLocationStepsNumber]][0]
			, oResultAggregatedIndexes = oStructuralIndex1[oProcessedXPathExpr[nLocationStepsNumber]][1]
			;			
			//get the parent items
			for (var i = nLocationStepsNumber - 1, il = 0; i > il; i--) {
				var oSequence = oStructuralIndex1[oProcessedXPathExpr[i]];
				oParentItems.push(oSequence[1]);
			}
			var nParentItemsLength = oParentItems.length;
			for (var i = 0, il = oResult.length; i < il; i++) {
				var oResultItem = oResult[i];
				if (oResultItem.length - 1 != nParentItemsLength) {
					oResult[i] = '';
					continue;
				}
				for (var j = 0, jl = nParentItemsLength; j < jl; j++) {
					var oSequenceItem = oResultItem[j + 1];
					//check for parenthood
					if (((oParentItems[j]) & (oSequenceItem)) >= (oSequenceItem) != true) {
						oResult[i] = '';
						break;
					}
				}
			}
			var oFilteredResult = [];
			for (var i = 0, il = oResult.length; i < il; i++) {
				if (oResult[i]) {
					oFilteredResult.push(oResult[i]);
				}
			}		
// 			oResult = oResult.filter(function(element, index, array) {
// 				return (element != '');
// 			});
		}
	});

});