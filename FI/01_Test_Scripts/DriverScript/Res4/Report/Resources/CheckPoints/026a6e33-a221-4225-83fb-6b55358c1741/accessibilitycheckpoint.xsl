<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
    <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"/>
        <!--
        <link rel="stylesheet" media="screen">
          <xsl:attribute name="href">../../Results.css</xsl:attribute>
        </link>
        -->
    <style>
        table {
        table-layout:fixed;
        border:1px solid black;
        border-collapse: collapse;
        }
        td {
        vertical-align:top;
        border-right:1px solid black;
        border-bottom:1px solid black;
        }
        td.tablehl {
        background-color: #eee;
        color: #669;
        font-size: 10pt;
        font-weight: bold;
        padding: 4px;
        }
        .text {
        font-size: 10pt;
        padding: 4px;
        }
        .Failed {
        color: #f03;
        font-size: 10pt;
        font-weight: bold;
        padding: 4px;
        }
    </style>
  <body>
    <table>
      <tr bgcolor="EEEEEE">
        <xsl:for-each select="table/tr/th">
        <td class="tablehl">
          <xsl:value-of select="." />
        </td>
        </xsl:for-each>
      </tr>
      <xsl:for-each select="table/tr">
      <tr bgcolor="white" >
        <xsl:for-each select="td">
          <xsl:if test="result='[NONE]'">
            <td valign="top" align="left" class="Failed">
              <span>
                 <xsl:value-of select="result" />
              </span>
            </td>
          </xsl:if>
          <xsl:if test="result!='[NONE]'">
            <td valign="top" align="left" class="text">
              <span>
                <xsl:value-of select="result" />
              </span>
            </td>
          </xsl:if>
        </xsl:for-each>
      </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
