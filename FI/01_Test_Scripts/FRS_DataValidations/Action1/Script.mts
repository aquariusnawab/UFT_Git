  

Public strReason
Public strResult

Call fnTestSuiteDriver()

' ************************************************************************************************************************************
' Created on :	12/19/2019
' Created by : Sireesha Maddirala
' Description : TestSuiteDriver
' **************************************************************************************************************************

Function fnTestSuiteDriver()
	
	'import test data
	Dim testDir: testDir = Environment.Value("TestDir")
	Dim a: a = split(Environment.Value("TestDir"), "\")
	Dim relPath: relPath = mid(testDir, 1, instr(1, testDir, a(ubound(a)-1), 1)-2)
	
	DataTable.ImportSheet relPath&"\07_Test_Data\UFT_InternalDemo.xls",1,"Global"
	rowCnt = DataTable.GetSheet("Global").GetRowCount
	'msgbox rowCnt
	
	For x = 1 To rowCnt Step 1
		
		DataTable.GetSheet("Global").SetCurrentRow(x)
		print x
		print DataTable.Value("ValidationType")
		blnRunFlag = DataTable.Value("Run")
		If Ucase(blnRunFlag) = "YES" Then
			'fetch all the test data
			strTestCaseId = DataTable.Value("TestCaseId")
			strValidationType = DataTable.Value("ValidationType")
			str_Product = DataTable.Value("Products")
			strDB_User = DataTable.Value("DB_User")
			strDB_Pwd = DataTable.Value("DB_Pwd")
			strsqlQuery = DataTable.Value("sqlQuery")
			strPDFFilePath = DataTable.Value("PDFFilePath")
			strTextFilePath = DataTable.Value("TextFilePath")
			strXMLRequestPath = DataTable.Value("XMLRequestPath")
			strXMLResponsePath = DataTable.Value("XMLResponsePath")
			strURL = DataTable.Value("URL")
			
								
			Select Case strValidationType
				Case "PDF_TXT Conversion"
		    	strReason = PDF_ReadPDFFileAndSaveinTextFile(strPDFFilePath,strTextFilePath,strresult)
				Case "WebServices"
				strReason = fnWebServiceRequest_ResponseValidations(strXMLRequestPath,strURL,strXMLResponsePath,strresult)
				Case "XML_Validations"
				strReason = fnXMLValidations(strURL,strresult)
				Case "Database_Validations"
				strReason = fnDatabaseValidation(strDB_User,strDB_Pwd,strsqlQuery,strresult)
				Case "JSON_Validations"
				strReason = fnJSONValidations(strresult)
				Case "Sample"
				strReason = testFunc
				Case "API"
				'SystemUtil.Run "C:\Program Files (x86)\Micro Focus\Unified Functional Testing\samples\Flights Application\FlightsAPI.exe"
				'SystemUtil.Run "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Micro Focus\Micro Focus Unified Functional Testing\Sample Applications\Flight API"
				RunAPITest "APITest2_1"
				Case "Mobile_Browser"
				strReason = fnMobBrowser(strResult)
				Case "MobileApp"	
				strReason = fn_MobileApp(strResult,str_Product)
				Case "JIRA"
				strReason = fnJira(strResult)
				Case "Accessibility"
				strReason = Fn_AccessibilityChk(strResult, strURL)
			End Select
			
					If strResult <> "FAIL" Then
					DataTable.Value("TestStatus") = "PASS"
					Else
					DataTable.Value("TestStatus") = "FAIL"
					End If
					If strReason<>"" Then
					DataTable.Value("TestValidationResult") = strReason
					End If
					If str_Product<>"" Then
                    DataTable.Value("Products") = str_Product
                    End If

		End If
	Next
	
	DataTable.Export relPath&"\07_Test_Data\UFT_InternalDemo_Results.xls"
	
	
	
End Function
    
 
    

