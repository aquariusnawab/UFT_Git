' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'		@Script Name:	Insert Order
'		@ Description:	This script inserts order in Flight Reservation System (FRS)
'		@ Date:					11/26/2012
'		@ Author:				Rahul Shirudkar
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'	***************** Start of Script *****************

	'	Setup Report
'		strExecutionStartTime = Now
'        strCurrentScriptName = Environment.Value("TestName")
'		strTestResultPath = Environment.Value("BatchName")
'    	fnReportSetUp 
'    	subAddActionNameInExcelReport 
'    	fnInsertBlankRow
'		subAddColumnNamesInReport

	'	Import Test Data
		subAddSheetToDataTable "InsertOrder"
		subImportSheet strTestDataPath & "FRS_InsertOrder.xls", "InsertOrder", "InsertOrder"
		'subImportSheet strTestDataPath & "FRS_InsertOrder", "InsertOrder", "InsertOrder"

	'	Start Application
		Set WshShell = CreateObject("WScript.Shell")
		Set oExec = WshShell.Exec(strAppPath)
		Set oExec = Nothing
		Set WshShell = Nothing

		If  Dialog("Login").Exist(10) Then		
           strDocName = fnCaptureScreenshot (Dialog("Login"), "LaunchApplication")
			 subWriteResultsToQC "VerifyApplicationLaunch"," Application is  launched","Application is launched","Passed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\LaunchApplication.doc"
		Else
			strDocName = fnCaptureScreenshot (Dialog("Login"), "LaunchApplication")
            subWriteResultsToQC "VerifyApplicationLaunch"," Application is  launched","Application is not launched","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\LaunchApplication.doc"
	
		End If

	'	Enter login details
		Dialog("Login").WinEdit("Agent Name:").Set fnReadDataTableValue("User","InsertOrder") @@ hightlight id_;_1966692_;_script infofile_;_ZIP::ssf2.xml_;_
		Dialog("Login").WinEdit("Password:").SetSecure  fnReadDataTableValue("Password","InsertOrder") @@ hightlight id_;_1901086_;_script infofile_;_ZIP::ssf4.xml_;_
		Dialog("Login").WinButton("OK").Click @@ hightlight id_;_1835402_;_script infofile_;_ZIP::ssf5.xml_;_

	'	Verify login 
		If  Window("Flight Reservation").Exist(20) Then
            strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "Login")
            subWriteResultsToQC "VerifyLogin","Login is successful","Login is successful","Passed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Login.doc"
		
		Else
			strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "Login")
            subWriteResultsToQC "VerifyLogin","Login is  successful","Login is not successful","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Login.doc"		
			ExitTest
		End If

	'	Enter passanger details		
		Window("Flight Reservation").ActiveX("EdDate").Type fnReadDataTableValue("Date","InsertOrder") @@ hightlight id_;_3343028_;_script infofile_;_ZIP::ssf6.xml_;_
		Window("Flight Reservation").WinComboBox("Fly From:").Select fnReadDataTableValue("FlyFrom","InsertOrder") @@ hightlight id_;_2032258_;_script infofile_;_ZIP::ssf7.xml_;_
		Window("Flight Reservation").WinComboBox("Fly To:").Select fnReadDataTableValue("FlyTo","InsertOrder") @@ hightlight id_;_1507894_;_script infofile_;_ZIP::ssf8.xml_;_

	'	Select flight
		Window("Flight Reservation").WinButton("FLIGHT").Click @@ hightlight id_;_1376870_;_script infofile_;_ZIP::ssf9.xml_;_

		If  Window("Flight Reservation").Dialog("Flights Table").Exist(5) Then
			'fnRecordsResultsInExcel intStepNumber+1, "Select Flight", "Flight selection dialog is displayed.", 0, ""
		Else
			strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "SelectFlight")
		    subWriteResultsToQC "VerifyLogin","Flight selection dialog is  displayed","Flight selection dialog is not  displayed","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\SelectFlight.doc" 
		
			Window("Flight Reservation").WinMenu("Menu").Select "File;Exit"
			'fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""	
			subExportDataTable strTestDataPath & "FRS_InsertOrder_Output.xls"		
			ExitTest
		End If

		Window("Flight Reservation").Dialog("Flights Table").WinButton("OK").Click @@ hightlight id_;_3080982_;_script infofile_;_ZIP::ssf10.xml_;_

		If Window("Flight Reservation").WinEdit("Name:").Exist(5) Then
			Window("Flight Reservation").WinEdit("Name:").Set fnReadDataTableValue("PaxName","InsertOrder")
		End If
	
		Window("Flight Reservation").WinButton("Insert Order").Click @@ hightlight id_;_3408870_;_script infofile_;_ZIP::ssf12.xml_;_

		Wait(10)

		intOrderNo = Window("Flight Reservation").WinEdit("Order No:").GetROProperty("text")

		If intOrderNo <> "" Then
			'fnRecordsResultsInExcel intStepNumber+1, "Verify Order", "Order is created with number - " & intOrderNo, 0, ""
			'subImportSheet strTestDataPath & "FRS_InsertOrder_Output", "InsertOrder", "InsertOrder"
			subWriteValueToDataTable "OrderNumber", "InsertOrder", intOrderNo
		Else
			strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "Order")
			 subWriteResultsToQC "VerifyLogin","Order is  created","Order isnot  created","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Order.doc" 
			'fnRecordsResultsInExcel intStepNumber+1, "Verify Order", "Order is not created. " , 1, strDocName
		End If

	'	Exit Application
		Window("Flight Reservation").WinMenu("Menu").Select "File;Exit"
		'fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""

	'	Save the test data
		subExportDataTable strTestDataPath & "FRS_InsertOrder_Output.xls"
		'subExportDataTable "[QualityCenter\Resources] Resources\ITSS\Test_Data\FRS_InsertOrder_Output"
   

	'	Generate Reports
		'subReportTestCaseStatus 
		'fnReportExecutionSummary 

'	***************** End of Script *****************


