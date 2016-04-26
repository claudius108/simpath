<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:output method="text"/>

  <xsl:template match="countries">
    <xsl:text>Here are the countries I know about:
</xsl:text>
    <xsl:apply-templates select="*">
      <xsl:sort select="." order="ascending" data-type="text"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="country">
    <xsl:value-of select="."/>
    <xsl:text>
</xsl:text>
  </xsl:template>
</xsl:stylesheet>
