SystemUtil.Run "C:\Program Files (x86)\Internet Explorer\iexplore.exe" @@ hightlight id_;_65692_;_script infofile_;_ZIP::ssf1.xml_;_
Dim objINetBrowser, objAddrTxt, obtBtnGo
Dim objGMailBrowser, objTxtUID, objTxtPWD, objChkStayLoggedIn, objBtnLogin

Set objINetBrowser = Description.Create
objINetBrowser("name").value = "DeloitteNet Home"

Set objAddrTxt = Description.Create
objAddrTxt("Class Name").value = "WinEdit"

Browser(objINetBrowser).WinEdit(objAddrTxt).SetText ("http://www.gmail.com")
Browser(objINetBrowser).WinEdit(objAddrTxt).Type(chr(13))

Set objGmailBrowser = Description.Create
Set objTxtUID = Description.Create
Set objTxtPWD = Description.Create
Set objChkStayLoggedIn = Description.Create
Set objBtnLogin = Description.Create

objGMailBrowser("name").value = "Gmail"

While Browser(objGMailBrowser).Exist = False
	Wait(1)
Wend

objTxtUID("name").value = "Email"
objTxtPWD("name").value = "Passwd"
objChkStayLoggedIn("html id").value = "PersistentCookie"
objBtnLogin("name").value = "Sign in"

Browser(objGMailBrowser).WebEdit(objTxtUID).Set ("auli.welcome")
Browser(objGMailBrowser).WebEdit(objTxtPWD).Set ("MyDearUmika3610")
Browser(objGMailBrowser).WebCheckBox(objChkStayLoggedIn).Set "Off"
Browser(objGMailBrowser).WebButton(objBtnLogin).Click


