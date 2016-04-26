<?xml version="1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:simpath="http://kuberam.ro/ns/simpath" xmlns:exslt="http://exslt.org/common">
	<xsl:output method="xml"/>
	<xsl:param name="currentDateTime">test</xsl:param>
	<xsl:template name="unaryPlusOp">
		<xsl:param name="sequence"/>
		<xsl:value-of select="sum($sequence/simpath:item/text())"/>
	</xsl:template>
	<xsl:template name="concatFunc">
		<xsl:param name="sequence"/>
		<simpath:result><xsl:value-of select="$sequence"/></simpath:result>
<!-- 		<xsl:for-each select="."><xsl:value-of select="."/></xsl:for-each> -->
	</xsl:template>
	<xsl:template name="castToString">
		<xsl:param name="string"/>
		<simpath:item><xsl:value-of select="$string"/></simpath:item>
	</xsl:template>

  <xsl:template match="/">
<!--	<xsl:variable name="term1">
		<xsl:call-template name="unaryPlusOp">
			<xsl:with-param name="sequence" select="exslt:node-set($XPathExpr)/*"/>
		</xsl:call-template>
	</xsl:variable>
	<xsl:variable name="term2">
		<xsl:call-template name="unaryPlusOp">
			<xsl:with-param name="sequence" select="exslt:node-set($XPathExpr)/*"/>
		</xsl:call-template>
	</xsl:variable>-->
<!-- 	<xsl:value-of select="$term1 + $term2"/> -->
	<xsl:call-template name="concatFunc">
<!-- 		<xsl:with-param name="sequence" select="/simpath:sequence/*"/> -->
		<xsl:with-param name="sequence">
			<xsl:text>Today </xsl:text>
			<xsl:text>is </xsl:text>
			<xsl:text>date: </xsl:text>
			<xsl:value-of select="$currentDateTime"/>
		</xsl:with-param>
	</xsl:call-template>
  </xsl:template>
</xsl:stylesheet>