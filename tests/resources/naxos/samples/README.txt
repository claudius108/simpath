Naxos was developed and tested on Saxon 6.5.  The following examples
assume you have saxon.jar in your classpath.

Try these:
java com.icl.saxon.StyleSheet user.xml ../naxos.xsl
java com.icl.saxon.StyleSheet country.xml ../naxos.xsl

To see what Saxon outputs for the same input:
java com.icl.saxon.StyleSheet -a user.xml
java com.icl.saxon.StyleSheet -a country.xml

