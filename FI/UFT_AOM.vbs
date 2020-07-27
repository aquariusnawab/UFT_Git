Dim qtApp
Dim qtTest

Set qtApp = CreateObject("QuickTest.Application")
If qtApp.launched = True then
	qtApp.Quit
End If
qtApp.SetActiveAddins Array("Web","Mobile",".Net","Wpf"), errorDescription

qtApp.Launch

qtApp.Visible = True

qtApp.Options.Run.ImageCaptureForTestResults = "OnError"
qtApp.Options.Run.RunMode = "Fast"
qtApp.Options.Run.ViewResults = True

qtApp.Open "C:\Users\nnaseeruddin\Documents\Nas_FI\FI\01_Test_Scripts\DriverScript", True
Set qtTest = qtApp.Test
qtTest.Settings.Run.OnError = "NextStep"

Set qtResultsOpt = CreateObject("QuickTest.RunResultsOptions") ' Create the Run Results Options object
qtResultsOpt.ResultsLocation = "C:\Users\nnaseeruddin\Documents\Nas_FI\FI\06_Test_Results"

qtTest.Run qtResultsOpt

qtTest.Close
'qtApp.quit

Set qtResultsOpt = Nothing 
Set qtTest = Nothing
Set qtApp = Nothing