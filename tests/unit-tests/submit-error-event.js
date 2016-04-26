$(document).ready(
  function() {
	  $x.submission({
		  "ref" : "simpath:instance('data')",
		  "resource" : "../resources/wrong-resource.xml",
		  "mode" : "synchronous",
		  "method" : "get",
		  "submit-error" : function(xhReq) {alert("URL '" + this.resource + "' is not valid.");}
	  });
});