﻿﻿
// Generate at 2020-03-10 13:29:41
var ServiSignErrorCode = 61001;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function getHCACSAPISVIAdapterObj() {
	
	//如有任何參數問題，請參考第 10, 11點
	//https://redmine.changingtec.com/redmine/projects/servisign/wiki/%E5%95%8F%E9%A1%8C%E8%88%87%E8%A7%A3%E7%AD%94

	//最低 ServiSign 版本 0.0.0.0 = 預設不開啟
	var minServiSignVersion = "0.0.0.0"
	//最低元件版本 0.0.0.0 = 預設不開啟
	var minLibVersion = "0.0.0.0"

	//底層元件 Adapter 名稱
	var LibName = ""
	//底層元件 Adapter 所在位置
	var LibDir = ""
	//Path ID
	var PathID = "18463EED6A6E496BB4381EA090DA5882"

	//最低不需更新安裝包版本
	var MinimalInstallerVersion = "1.0.20.0310"
	var MinimalInstallerVersion_Mac = ""
	var MinimalInstallerVersion_Linux = ""
	//JS 模板版本號 ServiSign 主程式會做相容性版本確認
	var JSVersion = "1.0.18.1219"

	//Tab 以分頁做為轉換模式，行為模式與 ActiveX 元件相同
	var ServiSignTabMode_Tab = 			0x0
	//Browser 模式則是以瀏覽器為單位，整個瀏覽器關掉才會釋放元件
	var ServiSignTabMode_Browser = 		0x1

	var ServiSignTabMode = ServiSignTabMode_Tab

	//預設不使用 cookie 儲存 Try port 的結果
	var useCookieTryPort = false
	
	//路徑保護
	//DataObj.pfxpath_servisignflag = true
    //DataObj.pfxpath = pfxpath.replace(/\\/g, "*")
	
	//開啟元件 UI 置頂功能
	//DataObj.topuidetect = true
	//開啟全系統 UI 置頂功能
	//DataObj.topuialldetect = true
	//開啟非同步功能
	//DataObj.asynchronously = true
	
	//資料斜線保護功能
	//DataObj.XXXXX_ServiSignSlashFlag = true
	//DataObj.XXXXX = inputXXXXXX.replaceAll("\\", "==ServiSignSlash==")
	//資料 Base64 保護功能
	//DataObj.XXXXX_ServiSignBase64Flag = true
	//DataObj.XXXXX = Base64Encode(XXXXX)
	//使用主線程呼叫 API
	//DataObj.ServiSignMainThread = true
	//變數保護功能
	//目前已經針對 pin, pw 跟 pass 等關鍵字顯示時自動遮蔽內容
	//如果想要額外遮蔽可在此調整:D
	//DataObj.XXXXX_ServiSignHide = true
	//回傳時可以隱藏 log  
	//DataObj.hide_result = true

	
	function ServiSignConnectError() {
		//ServiSign_RTN_CONNECTION_ERROR
		ServiSignErrorCode = 61006
	}
	function ServiSignLoadComponentError() {
		//Handing load component error
    }
	function ServiSignDisconnectError() {
		//Handing disconnect error
		ServiSignErrorCode = 61015
    }
    
    var VersionCompare_Error = 			0x00
	var VersionCompare_Bigger =			0x01
	var VersionCompare_Smaller = 		0x02
	var VersionCompare_Same = 			0x03

	function ServiSignLog(LogMessage) {
		console.log("[ServiSign Log] " + LogMessage)
	}
	function Sleep(milliseconds) {
		var start = new Date().getTime()
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break
			}
		}
	}
	function Base64Encode(input) {
		return encodeURIComponent(window.btoa(unescape(encodeURIComponent(input))))
	}
	function Base64Decode(input) {
		if(input == undefined) return ""
		return decodeURIComponent(escape(window.atob(input)))
	}
	function FixArray(inputArray) {
		ServiSignLog("FixArray: " + inputArray)
		var array = inputArray.split(";")

		// while(array.indexOf("") != -1){
		// 	var EmptyIndex = array.indexOf("")
		// 	array.splice(EmptyIndex, 1)
		// }
		
		array.toArray = function(){
			return this
		}
		array.splice(-1, 1);
		return array
	}
	function KeepAlive(DataObj) {
		var temp = ""
		DataObj.KeepAlive = true
		DataObj.topuidetect = true
		DataObj.ServiSignMainThread = true
		do{
			temp = ServiSignObj.Send(DataObj)
		}while(temp == "heartbeat")
		return temp
	}
	function isServiSignErrorCode(input) {
		var ErrorCode = parseInt(input) || 0
		return (61000 < ErrorCode && ErrorCode < 61999)
	}
	function getCookie(CookieName) {
		var TargetName = CookieName + "="
		var CookieArray = document.cookie.split(';')
		for (var i = 0; i < CookieArray.length; i++) {
			var CookieElement = CookieArray[i]
			while (CookieElement.charAt(0) == ' ') {
				CookieElement = CookieElement.substring(1)
			}
			if (CookieElement.indexOf(TargetName) == 0) {
				return CookieElement.substring(TargetName.length, CookieElement.length)
			}
		}
		return ""
	}
	function VersionCompare(VersionA, VersionB) {
		var iVersionA = parseInt(VersionA.replaceAll(",","").replaceAll(".","").replaceAll(" ","")) || 0
		var iVersionB = parseInt(VersionB.replaceAll(",","").replaceAll(".","").replaceAll(" ","")) || 0
		
		if(iVersionA == 0 || iVersionB == 0) return VersionCompare_Error
		if(iVersionA > iVersionB) return VersionCompare_Bigger
		if(iVersionA < iVersionB) return VersionCompare_Smaller
		return VersionCompare_Same
	}
	function BrowserDetection() {
		var sBrowser, sUsrAg = navigator.userAgent

		if(sUsrAg.indexOf("Edge") > -1){
			sBrowser = "Edge"
		} else if(sUsrAg.indexOf("Chrome") > -1) {
			sBrowser = "Chrome"
		} else if (sUsrAg.indexOf("Safari") > -1) {
			sBrowser = "Safari"
		} else if (sUsrAg.indexOf("Opera") > -1) {
			sBrowser = "Opera"
		} else if (sUsrAg.indexOf("Firefox") > -1) {
			sBrowser = "Firefox"
		} else if (sUsrAg.indexOf("MSIE") > -1 || sUsrAg.indexOf("Trident/7.0") > -1) {
			sBrowser = "Internet Explorer"
		} else {
			sBrowser = "unknown"
		}
		
		return sBrowser
	}
	function detectOS() {
		// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
		var userAgent = window.navigator.userAgent,
			platform = window.navigator.platform,
			macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
			windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
			os = null;
	  
		if (macosPlatforms.indexOf(platform) !== -1) {
		  	os = 'Mac'
		}
		else if (windowsPlatforms.indexOf(platform) !== -1) {
		  	os = 'Windows'
		}
		else if (!os && /Linux/.test(platform)) {
		  	os = 'Linux'
		}
	  
		return os
	}
	function verifyURL(input){
		
		if(input.indexOf("alert(") >= 0){
			return ""
		}

		if(input.indexOf('https://localhost:') != 0 && input.indexOf('https://127.0.0.1:') != 0){
			return ""
		}

		return encodeURI(input)
	}
	function getServiSignObj() {
		var portList = [56445, 56545, 56645]
        var InstallerName = "HCAServiSignAdapterSetup"
		
		var Url_Part1_DNS = 'https://localhost:'
		var Url_Part1_IP = 'https://127.0.0.1:'
		var SessionID =""
		var ServiSignUrl = ""

		var realServiSignVersion = ""
		var realLibVersion = ""
		var realInstallerVersion = ""
		var CurrenOSMinimalInstallerVersion = null
		
		var needUpdate = false
		var Browser = ""
		var OS = null

		var ServiSignObjResultObj = undefined

		var CallbackFunction = []
		var CallbackFunctionIndex = 0
		var isCloseAsynchronously = false
		
		var ServiSignObj = 
		{
			clearServiSignCallback : function(){
				ServiSignLog("CallbackFunction empty")
				CallbackFunction = []
				CallbackFunctionIndex = 0
			},
			setServiSignCallback : function(InputFunction){
				if(typeof InputFunction != "function"){
					CallbackFunction.splice(CallbackFunctionIndex + 1, 0, function(){return ;})
				}
				else{
					CallbackFunction.splice(CallbackFunctionIndex + 1, 0, InputFunction)
				}
			},
			sendData : function(url, DataObj){
				var XMLHttpRequestAsynchronously = (CallbackFunction.length != 0)
				var xhr = new XMLHttpRequest()
				
				try{
					if(verifyURL(url) == ""){
						return undefined
					}
					xhr.open('MagicMethodA|POST|MagicMethodB'.split('|')[1], verifyURL(url), XMLHttpRequestAsynchronously)
				}
				catch(err) {
					return undefined
				}
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
				var onLoadHandler = function(event){
					try {
						ServiSignObjResultObj = JSON.parse(this.responseText)
					}
					catch(err) {
						return undefined
					}

					if(XMLHttpRequestAsynchronously){
						CallbackFunction[CallbackFunctionIndex++](Base64Decode(ServiSignObjResultObj.result), this.ServiSignUrl);
						
						if(CallbackFunctionIndex == CallbackFunction.length){
							ServiSignObj.clearServiSignCallback();
						}
					}
				}
				xhr.onload = onLoadHandler

				DataObj.comname = LibName
				DataObj.libdir = LibDir
				if(ServiSignTabMode == ServiSignTabMode_Tab){
					DataObj.sessionid = SessionID
				}
				else if(ServiSignTabMode == ServiSignTabMode_Browser){
					DataObj.sessionid = Browser
				}
				DataObj.ServiSignTabMode = ServiSignTabMode
				DataObj.ServiSignBrowser = Browser
				DataObj.JSVersion = JSVersion
				DataObj.minlibversion = minLibVersion
				DataObj.minserverversion = minServiSignVersion
				DataObj.InstallerName = InstallerName
				DataObj.PathID = PathID
				DataObj.ServiSignJSGenTime = "2020-03-10 13:29:41"
				
				// For new version form 20190416
				DataObj.AdapterJsonKeyCheck = true				

				var readyDataObj = "Parameter=" + Base64Encode(JSON.stringify(DataObj))
				
				try {
					xhr.send(readyDataObj)
				}
				catch(err) {
					var header = xhr.getResponseHeader("via")
					if (header) {
						ServiSignErrorCode = 61014
					}
					else{
						ServiSignDisconnectError()
					}
					return undefined
				}
				return ServiSignObjResultObj
			},
			TryPort : function() {
				var resultObj
				var DataObj = new Object()
				var ErrorCode = 0

				OS = detectOS()
				Browser = BrowserDetection()

				ServiSignLog(OS)
				ServiSignLog(Browser)

				// DataObj.functionname = "ServiSignEcho"
				DataObj.functionname = "Echo"
				// if(useCookieTryPort){
				// 	ServiSignUrl = getCookie("ServiSignUrl")
				// }
				// else{
				// 	ServiSignUrl = ""
				// }
				ServiSignUrl = ""

				if(ServiSignUrl == "" || ServiSignUrl == "fail") {
					var EchoSuccess = false
					for (var i = 0; i < portList.length; i++) {
						var url
						if(OS == "Mac"){
							url = Url_Part1_DNS + (portList[i] - 2000)
						}
						else{
							url = Url_Part1_DNS + portList[i]
						}

						ServiSignLog("Echo URL: " + url)

						resultObj = this.sendData(url, DataObj)
						if(resultObj != undefined){
							
							ErrorCode = Base64Decode(resultObj.result)
				
							if(ErrorCode != "" && ErrorCode != "0") {
								ServiSignLog("Error code: " + ErrorCode)
								ServiSignErrorCode = parseInt(ErrorCode)
								continue
							}
							ServiSignUrl = url
							EchoSuccess = true
							break
						}
						if(ServiSignErrorCode == 61014){
							// 使用了 Proxy
							// if(useCookieTryPort){
							// 	document.cookie = "ServiSignUrl=fail"
							// }
							ServiSignLog("Using proxy")
							return false
						}
					}
					if(!EchoSuccess){
						for (var i = 0; i < portList.length; i++) {
							var url
							if(OS == "Mac"){
								url = Url_Part1_IP + (portList[i] - 2000)
							}
							else{
								url = Url_Part1_IP + portList[i]
							}

							ServiSignLog("Echo URL: " + url)

							resultObj = this.sendData(url, DataObj)
							if(resultObj != undefined){
								
								ErrorCode = Base64Decode(resultObj.result)
					
								if(ErrorCode != "" && ErrorCode != "0") {
									ServiSignLog("Error code: " + ErrorCode)
									continue
								}
								ServiSignUrl = url
								break
							}
							if(ServiSignErrorCode == 61014){
								// 使用了 Proxy
								// if(useCookieTryPort){
								// 	document.cookie = "ServiSignUrl=fail"
								// }
								ServiSignLog("Using proxy")
								return false
							}
						}
					}
				}
				else{
					ServiSignLog("Echo URL: " + url)
					resultObj = this.sendData(ServiSignUrl, DataObj)
				}

				if(resultObj == undefined){
					// if(useCookieTryPort){
					// 	document.cookie = "ServiSignUrl=fail"
					// }
					ServiSignConnectError()
					return false
				}
				
				ServiSignErrorCode = parseInt(ErrorCode) || 0
				if(ServiSignErrorCode == 0){
					// if(useCookieTryPort){
					// 	document.cookie = "ServiSignUrl=" + ServiSignUrl
					// }
				}
				else{
					// if(useCookieTryPort){
					// 	document.cookie = "ServiSignUrl=fail"
					// }
					return false
				}
				
				realServiSignVersion = Base64Decode(resultObj.ServerVersion)
				realLibVersion = Base64Decode(resultObj.LibVersion)
				realInstallerVersion = Base64Decode(resultObj.InstallerVersion)
				
				if(SessionID == "") {
					SessionID = Base64Decode(resultObj.SessionID)
				}

				if(OS == "Windows"){
					CurrenOSMinimalInstallerVersion = MinimalInstallerVersion
				}
				else if(OS == "Mac"){
					CurrenOSMinimalInstallerVersion = MinimalInstallerVersion_Mac
				}
				else if(OS == "Linux"){
					CurrenOSMinimalInstallerVersion = MinimalInstallerVersion_Linux
				}
				
				needUpdate = (VersionCompare(CurrenOSMinimalInstallerVersion, realInstallerVersion) == VersionCompare_Bigger || VersionCompare(CurrenOSMinimalInstallerVersion, realInstallerVersion) == VersionCompare_Error)
				
				ServiSignErrorCode = 0
				return true
			},
			Send : function(DataObj) {
				DataObj.comname = LibName
				var resultObj = this.sendData(ServiSignUrl, DataObj)
				try {
					return Base64Decode(resultObj.result)
				}
				catch(err) {
					return ""
				}
			},
			getCGServiSignVersion : function() {
				return realServiSignVersion
			},
			getLibVersion : function() {
				return realLibVersion
			},
			getInstallerVersion : function() {
				return realInstallerVersion
			},
			getMinimalInstallerVersion : function() {
				return CurrenOSMinimalInstallerVersion
			},
			ServiSigninit : function() {
				var XMLHttpRequestSupported = typeof new XMLHttpRequest().responseType === 'string'
				
				if(!XMLHttpRequestSupported) {
					alert("This Browser does NOT support XMLHttpRequest")
					return false
				}
				return this.TryPort()
			},
			ServiSignRelease : function() {
				if(ServiSignErrorCode != 0){
					return
				}

				var empty_func = function() { return undefined; };
				this.setServiSignCallback(empty_func)

				var DataObj = new Object()
				DataObj.functionname = "ServiSignRelease"
				DataObj.minlibversion = minLibVersion
				this.Send(DataObj)

				realServiSignVersion = ""
				realLibVersion = ""
				realInstallerVersion = ""
				CurrenOSMinimalInstallerVersion = null
				
				SessionID = ""
				needUpdate = false
				ServiSignErrorCode = 0
			},
			ServiSignForceRelease : function() {
				var DataObj = new Object()
				DataObj.functionname = "ServiSignForceRelease"
				DataObj.minlibversion = minLibVersion
				this.Send(DataObj)

				realServiSignVersion = ""
				realLibVersion = ""
				realInstallerVersion = ""
				CurrenOSMinimalInstallerVersion = null
				
				SessionID = ""
				needUpdate = false
				ServiSignErrorCode = 0
			},
			needUpdateInstaller : function() {
				return needUpdate
			},
			setServiSignValue : function(channel, domain_list, timeout, value){
				var DataObj = new Object()
				DataObj.functionname = "setServiSignValue"
				DataObj.channel = channel
				DataObj.domain_list = domain_list
				DataObj.timeout = timeout
				DataObj.value = value
				DataObj.value_ServiSignHide = true
				return this.Send(DataObj)
			},
			getServiSignValue : function(channel){
				var DataObj = new Object()
				DataObj.functionname = "getServiSignValue"
				DataObj.channel = channel
				DataObj.hide_result = true
				return this.Send(DataObj)
			}
		}
		return ServiSignObj
	}
	var ServiSignObj = getServiSignObj()
	var ServiSignInterface = 
	{
		GetServiSignVersion : function() {
			return ServiSignObj.getCGServiSignVersion()
		},
		GetLibVersion : function() {
			return ServiSignObj.getLibVersion()
		},
		GetInstallerVersion : function() {
			return ServiSignObj.getInstallerVersion()
		},
		GetMinimalInstallerVersion : function() {
			return ServiSignObj.getMinimalInstallerVersion()
		},
		SetServiSignCallback : function(InputFunction) {
			ServiSignObj.setServiSignCallback(InputFunction)
		},
		NeedUpdateInstaller : function() {
			return ServiSignObj.needUpdateInstaller()
		},
		ServiSignForceRelease : function() {
			return ServiSignObj.ServiSignForceRelease()
		},
		SetServiSignValue : function(channel, domain_list, timeout, value){
			return ServiSignObj.setServiSignValue(channel, domain_list, timeout, value)
		},
		GetServiSignValue : function(channel){
			return ServiSignObj.getServiSignValue(channel)
		},
		GetFakeErrorCode : function(){
			return 0;
		},
		HCA_GetCardVersion : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCardVersion"
			DataObj.ServiSignFunctionIndex = 0

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetCardType : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCardType"
			DataObj.ServiSignFunctionIndex = 1

			return ServiSignObj.Send(DataObj)
		},
		HCA_VerifyPIN : function(pincode, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_VerifyPIN"
			DataObj.pincode_ServiSignBase64Flag = true
			DataObj.pincode = Base64Encode(pincode)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 2

			return ServiSignObj.Send(DataObj)
		},
		HCA_OpenCOMPort : function(comport){
			var DataObj = new Object()
			DataObj.functionname = "HCA_OpenCOMPort"
			DataObj.comport = comport
			DataObj.ServiSignFunctionIndex = 3

			return ServiSignObj.Send(DataObj)
		},
		HCA_CloseCOMPort : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_CloseCOMPort"
			DataObj.ServiSignFunctionIndex = 4

			return ServiSignObj.Send(DataObj)
		},
		HCA_SetPIN : function(newPincode, pukcode, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_SetPIN"
			DataObj.newPincode_ServiSignBase64Flag = true
			DataObj.newPincode = Base64Encode(newPincode)
			DataObj.pukcode_ServiSignBase64Flag = true
			DataObj.pukcode = Base64Encode(pukcode)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 5

			return ServiSignObj.Send(DataObj)
		},
		HCA_SignMessage : function(data, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_SignMessage"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 6

			return ServiSignObj.Send(DataObj)
		},
		HCA_PublicEncrypt : function(data, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_PublicEncrypt"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 7

			return ServiSignObj.Send(DataObj)
		},
		HCA_LoadCert : function(bCert, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_LoadCert"
			DataObj.bCert_ServiSignBase64Flag = true
			DataObj.bCert = Base64Encode(bCert)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 8

			return ServiSignObj.Send(DataObj)
		},
		HCA_VerifySignMessage : function(bData, bSig, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_VerifySignMessage"
			DataObj.bData_ServiSignBase64Flag = true
			DataObj.bData = Base64Encode(bData)
			DataObj.bSig_ServiSignBase64Flag = true
			DataObj.bSig = Base64Encode(bSig)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 9

			return ServiSignObj.Send(DataObj)
		},
		HCA_PrivateDecrypt : function(cipher, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_PrivateDecrypt"
			DataObj.cipher_ServiSignBase64Flag = true
			DataObj.cipher = Base64Encode(cipher)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 10

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetBasicData : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetBasicData"
			DataObj.ServiSignFunctionIndex = 11

			return FixArray(ServiSignObj.Send(DataObj))
		},
		HCA_GetCardInfo : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCardInfo"
			DataObj.ServiSignFunctionIndex = 12

			return FixArray(ServiSignObj.Send(DataObj))
		},
		HCA_GetCardSN : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCardSN"
			DataObj.ServiSignFunctionIndex = 13

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetCert : function(flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCert"
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 14

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetCertAttr : function(bCert, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCertAttr"
			DataObj.bCert_ServiSignBase64Flag = true
			DataObj.bCert = Base64Encode(bCert)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 15

			return ServiSignObj.Send(DataObj)
		},
		HCA_TSQuery : function(data, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_TSQuery"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 16

			return ServiSignObj.Send(DataObj)
		},
		HCA_TSVerify : function(bData, bTimestamp, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_TSVerify"
			DataObj.bData_ServiSignBase64Flag = true
			DataObj.bData = Base64Encode(bData)
			DataObj.bTimestamp_ServiSignBase64Flag = true
			DataObj.bTimestamp = Base64Encode(bTimestamp)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 17

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetTSInfo : function(bTimestamp, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetTSInfo"
			DataObj.bTimestamp_ServiSignBase64Flag = true
			DataObj.bTimestamp = Base64Encode(bTimestamp)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 18

			return ServiSignObj.Send(DataObj)
		},
		HCA_CertValidate : function(bCert, bCACert, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_CertValidate"
			DataObj.bCert_ServiSignBase64Flag = true
			DataObj.bCert = Base64Encode(bCert)
			DataObj.bCACert_ServiSignBase64Flag = true
			DataObj.bCACert = Base64Encode(bCACert)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 19

			return ServiSignObj.Send(DataObj)
		},
		GetErrorCode : function(){
			var DataObj = new Object()
			DataObj.functionname = "GetErrorCode"
			DataObj.ServiSignFunctionIndex = 20

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetCardInfoByIndex : function(index){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCardInfoByIndex"
			DataObj.index = index
			DataObj.ServiSignFunctionIndex = 21

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetBasicDataByIndex : function(index){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetBasicDataByIndex"
			DataObj.index = index
			DataObj.ServiSignFunctionIndex = 22

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetCardInfoCount : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCardInfoCount"
			DataObj.ServiSignFunctionIndex = 23

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetBasicDataCount : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetBasicDataCount"
			DataObj.ServiSignFunctionIndex = 24

			return ServiSignObj.Send(DataObj)
		},
		HCA_MessageDigest : function(data){
			var DataObj = new Object()
			DataObj.functionname = "HCA_MessageDigest"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.ServiSignFunctionIndex = 25

			return ServiSignObj.Send(DataObj)
		},
		HCA_TSQueryEx : function(bIP, bPort, bData, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_TSQueryEx"
			DataObj.bIP_ServiSignBase64Flag = true
			DataObj.bIP = Base64Encode(bIP)
			DataObj.bPort_ServiSignBase64Flag = true
			DataObj.bPort = Base64Encode(bPort)
			DataObj.bData_ServiSignBase64Flag = true
			DataObj.bData = Base64Encode(bData)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 26

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetKeySize : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetKeySize"
			DataObj.ServiSignFunctionIndex = 27

			return ServiSignObj.Send(DataObj)
		},
		HCA_SignMessageEx : function(data, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_SignMessageEx"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 28

			return ServiSignObj.Send(DataObj)
		},
		Util_ReadFileToBase64 : function(bFileName){
			var DataObj = new Object()
			DataObj.functionname = "Util_ReadFileToBase64"
			DataObj.bFileName_ServiSignBase64Flag = true
			DataObj.bFileName = Base64Encode(bFileName)
			DataObj.ServiSignFunctionIndex = 29

			return ServiSignObj.Send(DataObj)
		},
		Util_WriteFileFromBase64 : function(bFileName, bB64Data){
			var DataObj = new Object()
			DataObj.functionname = "Util_WriteFileFromBase64"
			DataObj.bFileName_ServiSignBase64Flag = true
			DataObj.bFileName = Base64Encode(bFileName)
			DataObj.bB64Data_ServiSignBase64Flag = true
			DataObj.bB64Data = Base64Encode(bB64Data)
			DataObj.ServiSignFunctionIndex = 30

			return ServiSignObj.Send(DataObj)
		},
		HCA_SignDigest : function(data, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_SignDigest"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 31

			return ServiSignObj.Send(DataObj)
		},
		Util_WriteFileFromHexString : function(bFileName, bHexData){
			var DataObj = new Object()
			DataObj.functionname = "Util_WriteFileFromHexString"
			DataObj.bFileName_ServiSignBase64Flag = true
			DataObj.bFileName = Base64Encode(bFileName)
			DataObj.bHexData_ServiSignBase64Flag = true
			DataObj.bHexData = Base64Encode(bHexData)
			DataObj.ServiSignFunctionIndex = 32

			return ServiSignObj.Send(DataObj)
		},
		HCA_GetCertType : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_GetCertType"
			DataObj.ServiSignFunctionIndex = 33

			return ServiSignObj.Send(DataObj)
		},
		HCA_MessageDigestEx : function(b64data, iHashFlag, iFlag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_MessageDigestEx"
			DataObj.b64data_ServiSignBase64Flag = true
			DataObj.b64data = Base64Encode(b64data)
			DataObj.iHashFlag = iHashFlag
			DataObj.iFlag = iFlag
			DataObj.ServiSignFunctionIndex = 34

			return ServiSignObj.Send(DataObj)
		},
		CryptCertGetSignatureAlgorithm : function(strCert, iFlags){
			var DataObj = new Object()
			DataObj.functionname = "CryptCertGetSignatureAlgorithm"
			DataObj.strCert_ServiSignBase64Flag = true
			DataObj.strCert = Base64Encode(strCert)
			DataObj.iFlags = iFlags
			DataObj.ServiSignFunctionIndex = 35

			return ServiSignObj.Send(DataObj)
		},
		HCA_SignMessageEx2 : function(data, hashflag, flag){
			var DataObj = new Object()
			DataObj.functionname = "HCA_SignMessageEx2"
			DataObj.data_ServiSignBase64Flag = true
			DataObj.data = Base64Encode(data)
			DataObj.hashflag = hashflag
			DataObj.flag = flag
			DataObj.ServiSignFunctionIndex = 36

			return ServiSignObj.Send(DataObj)
		},
		CryptSignatureGetAlgorithm : function(b64_p1_Signature, b64_Signer_Certificate, iFlag){
			var DataObj = new Object()
			DataObj.functionname = "CryptSignatureGetAlgorithm"
			DataObj.b64_p1_Signature_ServiSignBase64Flag = true
			DataObj.b64_p1_Signature = Base64Encode(b64_p1_Signature)
			DataObj.b64_Signer_Certificate_ServiSignBase64Flag = true
			DataObj.b64_Signer_Certificate = Base64Encode(b64_Signer_Certificate)
			DataObj.iFlag = iFlag
			DataObj.ServiSignFunctionIndex = 37

			return ServiSignObj.Send(DataObj)
		},
		HCA_UnlockHPC : function(){
			var DataObj = new Object()
			DataObj.functionname = "HCA_UnlockHPC"
			DataObj.ServiSignFunctionIndex = 38

			return ServiSignObj.Send(DataObj)
		}
	}

	window.addEventListener("beforeunload", function (e) {
		if(ServiSignTabMode == ServiSignTabMode_Tab){
			ServiSignObj.ServiSignRelease()
		}
		else if(ServiSignTabMode == ServiSignTabMode_Browser){
			//Do nothing
		}
	})
	if(!ServiSignObj.ServiSigninit()){
		ServiSignLoadComponentError()
		return undefined
	}
	
	return ServiSignInterface
}

function ServiSign_GetErrorCode(){
	return ServiSignErrorCode
}
