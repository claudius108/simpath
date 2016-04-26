$(document).ready(function() {
  var KB      = 1024;
  var MS_IN_S = 1000;

  var parser;

  var buildAndParseTimer = null;
  var parseTimer         = null;

  var oldGrammar   = null;
  var oldParserVar = null;
  var oldInput     = null;

  function buildSizeAndTimeInfoHtml(title, size, time) {
    return $("<span/>", {
      "class": "size-and-time",
      title:   title,
      html:    (size / KB).toPrecision(2) + "&nbsp;kB, "
                 + time + "&nbsp;ms, "
                 + ((size / KB) / (time / MS_IN_S)).toPrecision(2) + "&nbsp;kB/s"
    });
  }

  function buildErrorMessage(e) {
    return e.line !== undefined && e.column !== undefined
      ? "Line " + e.line + ", column " + e.column + ": " + e.message
      : e.message;
  }

  function build() {
    oldGrammar   = $("#grammar").val();
    oldParserVar = $("#parser-var").val();

    $('#build-message').attr("class", "message progress").text("Building the parser...");
    $("#input").attr("disabled", "disabled");
    $("#parse-message").attr("class", "message disabled").text("Parser not available.");
    $("#output").addClass("disabled").text("Output not available.");
    $("#parser-var").attr("disabled", "disabled");
    $("#parser-download").addClass("disabled");

    try {
      var timeBefore = (new Date).getTime();
      parser = PEG.buildParser($("#grammar").val());
      var timeAfter = (new Date).getTime();

      $("#build-message")
        .attr("class", "message info")
        .html("Parser built successfully.")
        .append(buildSizeAndTimeInfoHtml(
          "Parser build time and speed",
          $("#grammar").val().length,
          timeAfter - timeBefore
        ));
      var parserUrl = "data:text/plain;charset=utf-8;base64,"
        + Base64.encode($("#parser-var").val() + " = " + parser.toSource() + ";\n");
      $("#input").removeAttr("disabled");
      $("#parser-var").removeAttr("disabled");
      $("#parser-download").removeClass("disabled").attr("href", parserUrl);

      var result = true;
    } catch (e) {
      $("#build-message").attr("class", "message error").text(buildErrorMessage(e));
      var parserUrl = "data:text/plain;charset=utf-8;base64,"
        + Base64.encode("Parser not available.");
      $("#parser-download").attr("href", parserUrl);

      var result = false;
    }

    return result;
  }

  function parse() {
    oldInput = $("#input").val();

    $("#input").removeAttr("disabled");
    $("#parse-message").attr("class", "message progress").text("Parsing the input...");
    $("#output").addClass("disabled").text("Output not available.");

    try {
      var timeBefore = (new Date).getTime();
      var output = parser.parse($("#input").val());
      var timeAfter = (new Date).getTime();

      $("#parse-message")
        .attr("class", "message info")
        .text("Input parsed successfully.")
        .append(buildSizeAndTimeInfoHtml(
          "Parsing time and speed",
          $("#input").val().length,
          timeAfter - timeBefore
        ));
      $("#output").removeClass("disabled").text(jsDump.parse(output));

      var result = true;
    } catch (e) {
      $("#parse-message").attr("class", "message error").text(buildErrorMessage(e));

      var result = false;
    }

    return result;
  }

  function buildAndParse() {
    build() && parse();
  }

  function scheduleBuildAndParse() {
    var nothingChanged = $("#grammar").val() === oldGrammar
      && $("#parser-var").val() === oldParserVar;
    if (nothingChanged) { return; }

    if (buildAndParseTimer !== null) {
      clearTimeout(buildAndParseTimer);
      buildAndParseTimer = null;
    }
    if (parseTimer !== null) {
      clearTimeout(parseTimer);
      parseTimer = null;
    }

    buildAndParseTimer = setTimeout(function() {
      buildAndParse();
      buildAndParseTimer = null;
    }, 500);
  }

  function scheduleParse() {
    if ($("#input").val() === oldInput) { return; }
    if (buildAndParseTimer !== null) { return; }

    if (parseTimer !== null) {
      clearTimeout(parseTimer);
      parseTimer = null;
    }

    parseTimer = setTimeout(function() {
      parse();
      parseTimer = null;
    }, 500);
  }

  $("#grammar, #parser-var")
    .change(scheduleBuildAndParse)
    .mousedown(scheduleBuildAndParse)
    .mouseup(scheduleBuildAndParse)
    .click(scheduleBuildAndParse)
    .keydown(scheduleBuildAndParse)
    .keyup(scheduleBuildAndParse)
    .keypress(scheduleBuildAndParse);

  $("#input")
    .change(scheduleParse)
    .mousedown(scheduleParse)
    .mouseup(scheduleParse)
    .click(scheduleParse)
    .keydown(scheduleParse)
    .keyup(scheduleParse)
    .keypress(scheduleParse);

  $("#loader").hide();
  $("#content").show();

  $("#grammar, #parser-var").removeAttr("disabled");

  $("#grammar, #input").focus(function() {
    var textarea = $(this);

    setTimeout(function() {
      textarea.unbind("focus");

      var tooltip = textarea.next();
      var position = textarea.position();

      tooltip.css({
        top:  (position.top - tooltip.outerHeight() - 5) + "px",
        left: (position.left + textarea.outerWidth() - tooltip.outerWidth()) + "px"
      }).fadeTo(400, 0.8).delay(3000).fadeOut();
    }, 1000);
  });

  $("#grammar").focus();

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
	$x.variables['instance-1'] = $x2.sequence($x.transform($x._instances['xml-1'], $x._instances['xml2soma']));
	
});
