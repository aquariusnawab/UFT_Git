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
'		subAddColumnNamesInRepor

	'	Import Test Data
		subAddSheetToDataTable "InsertOrder"
		subImportSheet strTestDataPath&"FRS_InsertOrder.xls", "InsertOrder", "InsertOrder"
		'subImportSheet strTestDataPath & "FRS_InsertOrder", "InsertOrder", "InsertOrder"

	'	Start Application
		Set WshShell = CreateObject("WScript.Shell")
		Set oExec = WshShell.Exec(strAppPath)
		Set oExec = Nothing
		Set WshShell = Nothing

		If  wpfwindow("HPE MyFlight Sample Applicatio").Exist(10) Then	
	        strDocName = fnCaptureScreenshot (wpfwindow("HPE MyFlight Sample Applicatio"), "LaunchApplication")
		   'subWriteResultsToQC "VerifyApplicationLaunch"," Application is  launched","Application is launched","Passed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\LaunchApplication.doc"
		Else
			strDocName = fnCaptureScreenshot (wpfwindow("HPE MyFlight Sample Applicatio"), "LaunchApplication")
            'subWriteResultsToQC "VerifyApplicationLaunch"," Application is  launched","Application is not launched","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\LaunchApplication.doc"
	
		End If

	'	Enter login details
'		Dialog("Login").WinEdit("Agent Name:").Set fnReadDataTableValue("User","InsertOrder") @@ hightlight id_;_1966692_;_script infofile_;_ZIP::ssf2.xml_;_
'		Dialog("Login").WinEdit("Password:").SetSecure  fnReadDataTableValue("Password","InsertOrder") @@ hightlight id_;_1901086_;_script infofile_;_ZIP::ssf4.xml_;_
'		Dialog("Login").WinButton("OK").Click' @@ hightlight id_;_1835402_;_script infofile_;_ZIP::ssf5.xml_;_

		wpfwindow("HPE MyFlight Sample Applicatio").WpfEdit("agentName").Set fnReadDataTableValue("User","InsertOrder")
		wpfwindow("HPE MyFlight Sample Applicatio").WpfEdit("password").Setsecure fnReadDataTableValue("Password","InsertOrder")
		wpfwindow("HPE MyFlight Sample Applicatio").WpfButton("OK").Click

	'	Verify login 
		If  Wpfwindow("HPE MyFlight Sample Applicatio").Exist(20) Then
            strDocName = fnCaptureScreenshot (Wpfwindow("HPE MyFlight Sample Applicatio"), "Login")
          '  subWriteResultsToQC "VerifyLogin","Login is successful","Login is successful","Passed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Login.doc"
		
		Else
			strDocName = fnCaptureScreenshot (Wpfwindow("HPE MyFlight Sample Applicatio"), "Login")
          '  subWriteResultsToQC "VerifyLogin","Login is  successful","Login is not successful","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Login.doc"		
			ExitTest
		End If

	'	Enter passanger details		
	
'		Window("Flight Reservation").ActiveX("EdDate").Type fnReadDataTableValue("Date","InsertOrder") @@ hightlight id_;_3343028_;_script infofile_;_ZIP::ssf6.xml_;_
'		Window("Flight Reservation").WinComboBox("Fly From:").Select fnReadDataTableValue("FlyFrom","InsertOrder") @@ hightlight id_;_2032258_;_script infofile_;_ZIP::ssf7.xml_;_
'		Window("Flight Reservation").WinComboBox("Fly To:").Select fnReadDataTableValue("FlyTo","InsertOrder") @@ hightlight id_;_1507894_;_script infofile_;_ZIP::ssf8.xml_;_
        Wpfwindow("HPE MyFlight Sample Applicatio").wpfcalendar("datePicker").Type fnReadDataTableValue("Date","InsertOrder")
        Wpfwindow("HPE MyFlight Sample Applicatio").Wpfcombobox("fromCity").Select fnReadDataTableValue("FlyFrom","InsertOrder")
        Wpfwindow("HPE MyFlight Sample Applicatio").Wpfcombobox("toCity").Select fnReadDataTableValue("FlyTo","InsertOrder")
        wpfwindow("HPE MyFlight Sample Applicatio").WpfComboBox("Class").Select fnReadDataTableValue("Class","InsertOrder")
        wpfwindow("HPE MyFlight Sample Applicatio").WpfComboBox("numOfTickets").Select fnReadDataTableValue("Tickets","InsertOrder")
        
	'	Select flight
		wpfwindow("HPE MyFlight Sample Applicatio").wpfbutton("FIND FLIGHTS").Click @@ hightlight id_;_1376870_;_script infofile_;_ZIP::ssf9.xml_;_

		If  wpfwindow("HPE MyFlight Sample Applicatio").wpfobject("SELECT FLIGHT").Exist(5) Then
		      FnRecordsResultsInExcel intStepNumber+1, "Select Flight", "Flight selection dialog is displayed.", 0, ""
		Else
			strDocName = fnCaptureScreenshot (wpfwindow("HPE MyFlight Sample Applicatio").wpfobject("SELECT FLIGHT"), "SelectFlight")
		    'subWriteResultsToQC "VerifyLogin","Flight selection dialog is  displayed","Flight selection dialog is not  displayed","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\SelectFlight.doc" 
			WpfWindow("HPE MyFlight Sample Applicatio").Click 437,449 @@ hightlight id_;_6361686_;_script infofile_;_ZIP::ssf25.xml_;_
			WpfWindow("HPE MyFlight Sample Applicatio").Close
			fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""	
			subExportDataTable strTestDataPath & "FRS_InsertOrder_Output.xls"		
			ExitTest
		End If
		
		Dim i,j
		i= inputbox("Please enter row number from the listed flights")
		j= inputbox("Please enter row number from the listed flights")
	
		WpfWindow("HPE MyFlight Sample Applicatio").WpfTable("flightsDataGrid").SelectCell i,j
		WpfWindow("HPE MyFlight Sample Applicatio").WpfButton("SELECT FLIGHT").Click @@ hightlight id_;_2090259768_;_script infofile_;_ZIP::ssf14.xml_;_
		WpfWindow("HPE MyFlight Sample Applicatio").WpfEdit("passengerName").Set fnReadDataTableValue("PaxName","InsertOrder") @@ hightlight id_;_2090541064_;_script infofile_;_ZIP::ssf22.xml_;_
		WpfWindow("HPE MyFlight Sample Applicatio").WpfButton("ORDER").Click @@ hightlight id_;_2090232120_;_script infofile_;_ZIP::ssf23.xml_;_
 @@ hightlight id_;_6361686_;_script infofile_;_ZIP::ssf24.xml_;_

'		Window("Flight Reservation").Dialog("Flights Table").WinButton("OK").Click'
'		If WpfWindow("HPE MyFlight Sample Applicatio").WpfEdit("passengerName").Exist(5) Then
'			Window("Flight Reservation").WinEdit("Name:").Set fnReadDataTableValue("PaxName","InsertOrder")
'		End If
'	    Window("Flight Reservation").WinButton("Insert Order").Click @@ hightlight id_;_3408870_;_script infofile_;_ZIP::ssf12.xml_;_
'
'		Wait(10)

		'intOrderNo = Window("Flight Reservation").WinEdit("Order No:").GetROProperty("text")
		
		intOrderNo = wpfwindow("HPE MyFlight Sample Applicatio").WpfObject("Order 87 completed").GetROProperty("name")

		If intOrderNo <> "" Then
			'fnRecordsResultsInExcel intStepNumber+1, "Verify Order", "Order is created with number - " & intOrderNo, 0, ""
			'subImportSheet strTestDataPath & "FRS_InsertOrder_Output", "InsertOrder", "InsertOrder"
			subWriteValueToDataTable "OrderNumber", "InsertOrder", intOrderNo
		Else
			strDocName = fnCaptureScreenshot (wpfwindow("HPE MyFlight Sample Applicatio"), "Order")
			 'subWriteResultsToQC "VerifyLogin","Order is  created","Order isnot  created","Failed","D:\ITSS\Test_Automation_Framework_V1\Test_Results\Screenshots\Order.doc" 
			'fnRecordsResultsInExcel intStepNumber+1, "Verify Order", "Order is not created. " , 1, strDocName
		End If

	'	Exit Application	
		WpfWindow("HPE MyFlight Sample Applicatio").Click 437,449 @@ hightlight id_;_6361686_;_script infofile_;_ZIP::ssf25.xml_;_
		WpfWindow("HPE MyFlight Sample Applicatio").Close @@ hightlight id_;_6361686_;_script infofile_;_ZIP::ssf27.xml_;_
	'	Window("Flight Reservation").WinMenu("Menu").Select "File;Exit"
		'fnRecordsResultsInExcel intStepNumber+1, "Exit Application", "Application is closed.", 0, ""

	'	Save the test data
		subExportDataTable strTestDataPath & "FRS_InsertOrder_Output.xls"
		'subExportDataTable "[QualityCenter\Resources] Resources\ITSS\Test_Data\FRS_InsertOrder_Output"
   

	'	Generate Reports
		'subReportTestCaseStatus 
		'fnReportExecutionSummary 

'	***************** End of Script *****************


