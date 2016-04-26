$(document).ready(function() {

	JSLitmus.test('Compile "7*22" with Jison parser', function(count) {
		while (count--) {
			var result = JISONparser.parse('7*22');
		}
	});

	JSLitmus.test('Compile "7*22" with PEGJS parser', function(count) {
		while (count--) {
			var result = PEGJSparser.parse('7*22');
		}
	});	

	JSLitmus.test('Compile "7*22" with PEG Packrat parser', function(count) {
		while (count--) {
			var result = PEGPACKRATparser('7*22');
		}
	});
	
});