<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:output method="xml"/>
  
  <xsl:template match="victim">
    <xsl:apply-templates select="document('letter.xml', /)/letter">
      <xsl:with-param name="person" select="."/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="letter">
    <xsl:param name="person"/>
    <html>
      <head>
        <title>Spam for <xsl:value-of select="$person/name"/></title>
      </head>
      <body>
        <xsl:apply-templates>
          <xsl:with-param name="person" select="$person"/>
        </xsl:apply-templates>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="para">
    <xsl:param name="person"/>
    <p>
      <xsl:apply-templates>
        <xsl:with-param name="person" select="$person"/>
      </xsl:apply-templates>
    </p>
  </xsl:template>

  <xsl:template match="person">
    <xsl:param name="person"/>
    <xsl:value-of select="$person/title"/>
    <xsl:text> </xsl:text>
    <xsl:value-of select="$person/name"/>
  </xsl:template>

  <xsl:template match="country">
    <xsl:param name="person"/>
    <xsl:value-of select="document('country.xml')/countries/country[@id = $person/country/@idref]"/>
  </xsl:template>

  <xsl:template match="signoff">
    <p>
    <xsl:text>Yours sincerely,</xsl:text>
    </p>
  </xsl:template>

</xsl:stylesheet>
