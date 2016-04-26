<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:msxsl="urn:schemas-microsoft-com:xslt"
xmlns:document="http://exslt.org/document-lite"
>
<msxsl:script language="JScript" implements-prefix="document">
<![CDATA[ 
/**
<doc:module date="2001-06-16">
   <doc:module>exslt:document-lite</doc:module>
   <doc:name>document</doc:name>
   <doc:version>1.0</doc:version>
   <doc:language>exslt:javascript</doc:language>
   <doc:meta>
      <doc:author email="chris@bayes.co.uk" url="http://www.bayes.co.uk">Chris Bayes</doc:author>
      <doc:summary>Implementation of exslt:document and xsl 2.0 external-file</doc:summary>
      <doc:todo></doc:todo>
   </doc:meta>
</doc:module>
**/
/**
<doc:function date="2001-06-16">
	<doc:name>externalFile</doc:name>
	<doc:version>1.0</doc:version>
	<doc:return type="string" />
	<doc:args>
		<doc:arg name="href" type="string" default="''" optional="no">{ uri-reference }</doc:arg>
	</doc:args>
</doc:function>
**/
function externalFile(href){
	var xml = new ActiveXObject("MSXML2.FreeThreadedDOMDocument");
	if ((result = _read(href)) == ""){
		xml.loadXML("<?xml version=\"1.0\"?><a>" + result + "</a>");
		return xml.selectNodes("/a");
	}
	return result;
}
function _read(href){
	var result = "";
	var parts = /(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/.exec(href);
	if (parts != null && parts.length != 0){
		try{
			var inet = new ActiveXObject("InetCtls.Inet");
			return inet.OpenURL(href);
		}catch(e){
			return e.description;
		}
	}
	try{
		parts = /(\w+):\/\/\/(.*)/.exec(href);
		if ((typeof(parts) == "Array") && parts.length != 0){
			href = parts[2];
		}
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var file = fso.OpenTextFile(href, 1, false, -2);
		result = file.ReadAll();
		file.Close();
		return result;
	}catch(e){
		return e.description;
	}
	return "";
}
]]>
</msxsl:script>
</xsl:stylesheet>