
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'		@Script Name:	Delete Order
'		@ Description:	This script deletes order from Flight Reservation System (FRS)
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
		subAddSheetToDataTable "DeleteOrder"
		subImportSheet strTestDataPath & "FRS_InsertOrder_Output.xls", "InsertOrder", "DeleteOrder"
		' subImportSheet strTestDataPath & "FRS_InsertOrder_Output", "InsertOrder", "DeleteOrder"

	'	Start Application
		Set WshShell = CreateObject("WScript.Shell")
		Set oExec = WshShell.Exec(strAppPath)
		Set oExec = Nothing
		Set WshShell = Nothing

		If  Dialog("Login").Exist(10) Then
			'fnRecordsResultsInExcel intStepNumber+1, "Launch Application", "Application is launched.", 0, ""
            strDocName = fnCaptureScreenshot (Dialog("Login"), "LaunchApplication")
            subWriteResultsToQC "VerifyApplicationLaunch"," Application is  launched","Application is launched","Passed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\LaunchApplication.doc"
		Else
			strDocName = fnCaptureScreenshot (Dialog("Login"), "LaunchApplication")
            subWriteResultsToQC "VerifyApplicationLaunch"," Application is  launched","Application is not launched","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\LaunchApplication.doc"
			'fnRecordsResultsInExcel intStepNumber+1, "Launch Application", "Application is not launched.", 1, strDocName
           ' Reporter.RunStatus = micFail
			'subReportTestCaseStatus
			'fnReportExecutionSummary
			ExitTest
		End If

	'	Enter login details
		Dialog("Login").WinEdit("Agent Name:").Set fnReadDataTableValue("User","DeleteOrder")
		Dialog("Login").WinEdit("Password:").SetSecure  fnReadDataTableValue("Password","DeleteOrder")
		Dialog("Login").WinButton("OK").Click

	'	Verify login 
		If  Window("Flight Reservation").Exist(15) Then
            strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "Login")
            subWriteResultsToQC "VerifyLogin","Login is successful","Login is successful","Passed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Login.doc"
			'fnRecordsResultsInExcel intStepNumber+1, "Verify Login", "Login is successful.", 0, ""
		Else
			strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "Login")
            subWriteResultsToQC "VerifyLogin","Login is  successful","Login is not successful","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Login.doc"
			'fnRecordsResultsInExcel intStepNumber+1, "Verify Login", "Login is not successful.", 1, strDocName
            'Reporter.RunStatus = micFail
			'subReportTestCaseStatus
		'	fnReportExecutionSummary
			ExitTest
		End If

	'	Open Order
		Window("Flight Reservation").WinMenu("Menu").Select "File;Open Order..."

		If Window("Flight Reservation").Dialog("Open Order").Exist(5) Then
			'fnRecordsResultsInExcel intStepNumber+1, "Open Order", "Open order form is displayed.", 0, ""
			Window("Flight Reservation").Dialog("Open Order").WinCheckBox("Order No.").Set "ON"
			Window("Flight Reservation").Dialog("Open Order").WinEdit("Edit").Set fnReadDataTableValue("OrderNumber","DeleteOrder")
			Window("Flight Reservation").Dialog("Open Order").WinButton("OK").Click
		Else
		
            strDocName = fnCaptureScreenshot (Window("Flight Reservation"), "OpenOrderForm")
			subWriteResultsToQC "VerifyOpenOrderForm","Open order form is displayed","Open order form is not displayed","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\OpenOrderForm.doc"
			'fnRecordsResultsInExcel intStepNumber+1, "Open Order", "Open order form is not displayed.", 1, strDocName
          '  Reporter.RunStatus = micFail 
			Window("Flight Reservation").WinMenu("Menu").Select "File;Exit"
			'fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""
			'subReportTestCaseStatus
			'fnReportExecutionSummary
			ExitTest
		End If

	'	Check if Order exists
		If Window("Flight Reservation").Dialog("Open Order").Dialog("Flight Reservations").WinButton("OK").Exist(5) Then
			strDocName = fnCaptureScreenshot (Window("Flight Reservation").Dialog("Open Order").Dialog("Flight Reservations"), "NoOrder")
            subWriteResultsToQC "OrderDoesNotExist","Order number  exist","Order number does not exist","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\NoOrder.doc"
            'fnRecordsResultsInExcel intStepNumber+1, "Open Order", "Order does not exists.", 1, strDocName
			Window("Flight Reservation").Dialog("Open Order").Dialog("Flight Reservations").WinButton("OK").Click
			Window("Flight Reservation").Dialog("Open Order").WinButton("Cancel").Click
            'Reporter.RunStatus = micFail
			Window("Flight Reservation").WinMenu("Menu").Select "File;Exit"
'			fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""
'			subReportTestCaseStatus
'			fnReportExecutionSummary
			ExitTest
		End If

		'fnRecordsResultsInExcel intStepNumber+1, "Open Order", "Order is displayed.", 0, ""
		Window("Flight Reservation").WinButton("Delete Order").Click
		Window("Flight Reservation").Dialog("Flight Reservations").WinButton("Yes").Click
		'fnRecordsResultsInExcel intStepNumber+1, "Delete Order", "Order is deleted.", 0, ""
		
	'	Exit Application
		Window("Flight Reservation").WinMenu("Menu").Select "File;Exit"
		'fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""

	'	Generate Reports
		'subReportTestCaseStatus
		'fnReportExecutionSummary 

'	***************** End of Script *****************

