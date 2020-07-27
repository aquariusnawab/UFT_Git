' ************************************************************************************************************************************
' Created on :	12/19/2019
' Created by : Veena koka
' Description
'			DatabaseValidation
' **************************************************************************************************************************

	'Create ADODB connection object
	Set objConnection = CreateObject("ADODB.Connection")
	
	
	'Create Recordsetobject
	Set objRecordSet = CreateObject("ADODB.Recordset")
	
	'Connect to DB using provider and server
	strConString = "provider=MSDASQL.1;Data source=SITW; User Id=IE_APP_REPORT_DEV; Password=Uh1prep0rts17; Trusted_Connection=Yes"
	objConnection.open strConString
	
	
	'Write the SQL Query
	sqlQuery="Select * from RP_sherlock_metrics where BEGIN_DATE = '01-JUL-19' and END_DATE = '30-SEP-19'"
	
	
	'Execute the query
	objRecordSet.open sqlQuery,objConnection 
	
	'Create Datatable from exixting function lib 
	subAddSheetToDataTable "Sherlock"
	
	Datatable.getsheet("Sherlock").Addparameter "TYPE"," "
	Datatable.getsheet("Sherlock").Addparameter "TYPETEST"," "
	Datatable.getsheet("Sherlock").Addparameter "COL1"," "
	Datatable.getsheet("Sherlock").Addparameter "COL2"," "
	Datatable.getsheet("Sherlock").Addparameter "COL3"," "
	Datatable.getsheet("Sherlock").Addparameter "COL4"," "
	Datatable.getsheet("Sherlock").Addparameter "COL5"," "
	
	i=0
	
	While not objrecordset.EOF
		a = objrecordset.Fields("TYPE")
		b = objrecordset.Fields("COL1_COUNT")
		c = objrecordset.Fields("COL2_COUNT")
		d = objrecordset.Fields("COL3_COUNT")
		e = objrecordset.Fields("COL4_COUNT")
		f = objrecordset.Fields("COL5_COUNT")
		
		i=i+1
		datatable.SetCurrentRow(i)
		
		subWriteValueToDataTable "TYPE", "Sherlock", a	
		subWriteValueToDataTable "COL1", "Sherlock", b
		subWriteValueToDataTable "COL2", "Sherlock", c
		subWriteValueToDataTable "COL3", "Sherlock", d
		subWriteValueToDataTable "COL4", "Sherlock", e
		subWriteValueToDataTable "COL5", "Sherlock", f
		
		'Validating the data with regular expressions
		'we an validate pattern like user name and passwords
		Set reg = new regexp
		reg.global = true
		reg.ignorecase = true
		reg.pattern = "$s"
		Set result = reg.execute(a)
		Resulttest = reg.test(a)
		
		subWriteValueToDataTable "TYPETEST", "Sherlock", Resulttest
		
		Objrecordset.MoveNext
		
	Wend
	
	subExportDataTable "C:\Users\kpravallika\Desktop\F1.xlsx"
	
	objRecordSet.Close
	objConnection.Close
	Set objConnection = Nothing
	Set objRecordSet = Nothing



