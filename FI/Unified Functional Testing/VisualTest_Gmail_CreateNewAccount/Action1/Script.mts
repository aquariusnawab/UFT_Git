eyes.ApiKey = "m8NjH9wwqtDinrf2yryHIbQPlGF121vkg100fExaqH9SE110"

SystemUtil.Run "iexplore","https://www.google.com/intl/en-GB/gmail/about"
Set testBrowser = Browser("Gmail")
testBrowser.WaitProperty "Exist", TRUE
eyes.SetBaselineInfoFromWindow(testBrowser)

' ***** Start visual UI testing - Open eyes test
eyes.Open "Gmail - Account Creation", "Welcome to GMail"

' ***** Visual checkpoint #1 - checks home page
eyes.CheckObject testBrowser, "CHK_Gmail", "Checking GMail Home page"

' ***** Click 'Create an account' link
If testBrowser.Page("Gmail Home").WebButton("Create an account").Exist Then
	testBrowser.Page("Gmail Home").WebButton("Create an account").Click
Else
	testBrowser.Page("Gmail Home").Link("Create an account").Click
End If
testBrowser.WaitProperty "Exist", TRUE

' ***** Switch the browser to the account creation page
Set testBrowser = Browser("GMail_Create Your Account")
eyes.SetBaselineInfoFromWindow(testBrowser)

' ***** Visual checkpoint #2 - checks account creation data entry page
eyes.CheckObject testBrowser, "CHK_CreateAccount", "Checking User details entry page"

' ***** Data entry
DataTable.Import "C:\Unified Functional Testing\06_Test_Results\Visual Testing\GMail Account Creation Data.xlsx"
Wait(5)
strFName = DataTable.Value("FIRSTNAME")
strLName = DataTable.Value("LASTNAME")
strUsername = DataTable.Value("USERNAME")
strPassword = DataTable.Value("PASSWORD")


testBrowser.Page("Create your Google Account").WebEdit("First name").Set strFName
testBrowser.Page("Create your Google Account").WebEdit("Last name").Set strLName
testBrowser.Page("Create your Google Account").WebEdit("Username").Set strUsername
testBrowser.Page("Create your Google Account").WebEdit("Password").Set strPassword
testBrowser.Page("Create your Google Account").WebEdit("Confirm").Set strPassword
testBrowser.Page("Create your Google Account").WebButton("Next").Click
testBrowser.WaitProperty "Exist", TRUE
Wait(3)

' ***** Visual checkpoint #3 - Mobile number entry form
eyes.CheckObject testBrowser, "CHK_EnterMobileNumber", "Checking Mobile Number Verification page"

' Close the eyes visual test
eyes.Close()

'testBrowser.Close

' ***** Report
If Not eyesReport.IsPassed Then
    If eyesReport.IsNew Then
        Reporter.ReportEvent micFail, eyesReport.TestName, "New test inserted, See " & eyesReport.Url & " for details."
    else
        Reporter.ReportEvent micFail, eyesReport.TestName, "See " & eyesReport.Url & " for details."
    End If
Else
	Reporter.ReportEvent micPass, eyesReport.TestName, "See " & eyesReport.Url & " for details."   
End If

