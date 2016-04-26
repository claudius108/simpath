<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:document="http://exslt.org/document-lite"
>
<xsl:include href="externalFile.msxml.xsl" />
	
<xsl:template match="/">
	<html>
	<head>
	<style>
		.function{
			background-color:gray;
			color:white;
			font-size:12pt;
			font-weight:bold;
			text-align:center;
		}
		.error{
			background-color:#ff6666;
			font-size:10pt;
		}
		.success{
			background-color:66ff66;
			font-size:10pt;
		}
		.durtable{
			font-size:10pt;
		}
	</style>
	</head>
	<body>
		<h1><center>Document Test</center></h1>
		<xsl:apply-templates />
	</body>
	</html>
</xsl:template>
<xsl:template match="node()|@*">
	<xsl:copy><xsl:apply-templates select="node()|@*" /></xsl:copy>
</xsl:template>
<xsl:template match="liveCode">
	<pre><xsl:value-of select="document:externalFile(string(@href))" /></pre>
</xsl:template>
</xsl:stylesheet>




