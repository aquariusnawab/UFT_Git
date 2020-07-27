'***********************
'Author : Veena koka
'****************************

Dim argXMLFilePath,argParentName,argExcelPath,argSheetName,argFirstNodeData,strFlag

argXMLFilePath = "C:\Users\kpravallika\Desktop\WorkerDetails.Xml"
argParentName = "Worker"
rv = "true"
getChildNode = "Summary"  ' You can pick up this data through data table or some environment variable
getSubchild = "Employee_ID"

Set oXMLFile = CreateObject("Microsoft.XMLDOM")
oXMLFile.Load(argXMLFilePath)
oXMLFile.async = False
Set det=oXMLFile.SelectNodes("/WorkerDetails/Worker")

ObjparentCnt =  det.Length
msgbox ObjparentCnt

For i = 0 To (ObjparentCnt-1) Step 1
	ParentName = det.item(i).nodename
	print "Parent node name: " & ParentName
	Set ChildNodes1= det.item(i).childnodes
	c = childnodes1.length
	print c
	For i1 = 0 To c-1 Step 1
		print "child node name: "& childnodes1(i1).nodename
		print "child node name: "& childnodes1(i1).text
		Set subchildnodes = childnodes1.item(i1).childnodes
		sc = subchildnodes.length
		print sc
		For sc = 0 To sc-1 Step 1
			print "sub child node name: "& childnodes1(sc).nodename
		    print "sub child node name: "& childnodes1(sc).text
		    On error resume next
		Next
	Next
Next

'
''*****************************************************
''argXMLFilePath = "D:\Demo.xml"
'argParentName = "Worker"
'strExcelPath = "D:\WorkdayIntegration\NGA\Demo.xls"
'strSheetName = "Sheet1"
'argEmpID = "123456"
'Call  fn_ExtractXMLNodes_ToExcel(argXMLFilePath,argParentName,strExcelPath,strSheetName,argEmpID,"")		
'Call  fn_Verify_XML_Data_FromExcelSheet(argXMLFilePath,argEmpID,strExcelPath,strSheetName,"",argParentName)
