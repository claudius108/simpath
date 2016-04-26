<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:exslt="http://exslt.org/common" xmlns:simpath="http://kuberam.ro/ns/simpath" xmlns:xqx="http://www.w3.org/2003/12/XQueryX" version="1.0">
    <xsl:output method="xml"/>
    <xsl:param name="currentDateTime">test</xsl:param>
    <xsl:template match="/">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="xqx:functionCallExpr[xqx:functionName = 'concat']">
        <simpath:result>
            <xsl:for-each select="./xqx:arguments/*">
                <xsl:value-of select="."/>
            </xsl:for-each>
        </simpath:result>
    </xsl:template>
    <xsl:template match="xqx:functionCallExpr[xqx:functionName = 'current-dateTime']" priority="9">
        <xqx:stringConstantExpr>
            <xqx:value>
                <xsl:value-of select="$currentDateTime"/>
            </xqx:value>
        </xqx:stringConstantExpr>
    </xsl:template>
</xsl:stylesheet>