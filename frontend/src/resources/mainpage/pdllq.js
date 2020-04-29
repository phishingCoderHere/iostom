function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"
	];
	var flag = true;
	for(var v = 0; v < Agents.length; v++) {
		if(userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}
/**
 *判断是否是微信浏览器
 // */
 function is_wechat() {
	 var ua = window.navigator.userAgent.toLowerCase();
	 if(ua.match(/MicroMessenger/i) == 'micromessenger') {
		return 1;
	 } else {
		return 0;
	}
 }


//判断浏览器
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1){
  return "Chrome";
 }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}



//判断访问终端--用这个方法准确
function device() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	return {
		isIpad: sUserAgent.match(/ipad/i) == "ipad",
		isIphoneOs: sUserAgent.match(/iphone os/i) == "iphone os",
		isAndroid: sUserAgent.match(/android/i) == "android",
		isWeiXin: sUserAgent.match(/micromessenger/i) == "micromessenger",
		isWeiBo: sUserAgent.match(/weibo/i) == "weibo"
	}
}

function get_query_val(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function formatNum(str) {
	var newStr = "";
	var count = 0;

	if(str.indexOf(".") == -1) {
		for(var i = str.length - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		str = newStr + '.00';
	} else {
		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符相接起来
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
	}

	return str;
}

//随机数
function randomNum(minNum, maxNum) {
	switch(arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}

function getNowFormatDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + month + strDate;
	console.log(currentdate);
	return currentdate;
}

$(function() {
	var osv = getOsv();
	var osvArr = osv.split('.');
	//初始化显示ios9引导
	if(osvArr && osvArr.length > 0) {
		if(parseInt(osvArr[0]) == 11 || parseInt(osvArr[0]) == 12) { //ios11或ios12
			try {
				window.openDatabase(null, null, null, null);
			} catch(_) {
				window.location.href = 'wuhen.html';
			}

			var isPrivate = false;
			try {
				window.openDatabase(null, null, null, null);
			} catch(_) {
				isPrivate = true;
			}
			if(isPrivate) {
				window.location.href = 'wuhen.html';
			}

		} else {
			try {
				localStorage.setItem('isPrivateMode', '1');
				localStorage.removeItem('isPrivateMode');
				window.isPrivateMode = false;
			} catch(e) {
				window.isPrivateMode = true;
			}
			if(!window.isPrivateMode) { // 不是 Safari 无痕模式并且能用 localStorage

			} else {
				window.location.href = 'wuhen.html';
			}
		}
	}

})

//获取固件版本
function getOsv() {
	var reg = /OS ((\d+_?){2,3})\s/;
	if(navigator.userAgent.match(/iPad/i) || navigator.platform.match(/iPad/i) || navigator.userAgent.match(/iP(hone|od)/i) || navigator.platform.match(/iP(hone|od)/i)) {
		var osv = reg.exec(navigator.userAgent);
		if(osv.length > 0) {
			return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
		}
	}
	return '';
}

//禁用手指双击缩放：
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function(event) {
	var now = Date.now();
	if(now - lastTouchEnd <= 300) {
		event.preventDefault();
	}
	lastTouchEnd = now;
}, false);

function stringToStar(str) {
	if(str.length > 0) {
		var newStr = str[0];
		for(var i = 1; i < str.length; i++) {
			newStr += "*"
		}
		return newStr;
	} else {
		return str;
	}
}