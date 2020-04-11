var smart = {};


/**
 * ajax请求封装
 */
smart.ajax = function (config) {
	if (!config.url) {//当请求的url地址不存在时，抛出错误提示
		smart.showErrorTip("url地址不存在"); return;
	}
	if (config.type && config.type.toUpperCase() == "GET" && config.url.indexOf("#") > 0) {
		//		var url = config.url;
		var url = encodeURI(config.url);
		var reg = new RegExp("\#", "g");
		config.url = url.replace(reg, '%23');
	}
	/**
	 * 修改js对象为json数据
	 * 1.声明的提交数据类型为json
	 * 2.存在提交数据
	 * 3.提交数据对象是js数组或对象时
	 */
	if (config.contentType === "application/json" && config.data && (typeof (config.data) == 'array' || typeof (config.data) == 'object'))
		config.data = config.data;



	// * 包含查询成功的数据过滤器
	//	var dataFilter = config.dataFilter;
	//	config.dataFilter = function(data,type){
	//		//相应处理
	//		smart.exeFun(data2,type);
	//	}

	//覆盖查询成功的回调函数
	//缓存用户定义的查询成功的回调函数
	var successFun = config.success,
		dataType = config.dataType,//数据类型
		errorFun = config.error;

	var path = config.path;
	/**
	 * 1.data:回填数据
	 * 2.textStatus:服务器返回的状态值
	 * 3.jqXHR jquery 以xmlHTTPRequest为基础封装出来的对象
	 */
	config.success = function (data, textStatus, jqXHR) {
		//1.程序员回调函数
		smart.exeFun(successFun, data, textStatus, jqXHR);
	}

	config.error = function (data, textStatus, jqXHR) {
		//1.程序员回调函数
		smart.exeFun(successFun, data, textStatus, jqXHR);
	}
	/**
	 * 1.jqXHR jquery 以xmlHTTPRequest为基础封装出来的对象
	 * 2.textStatus:服务器返回的状态值
	 * 3.errorThrown 异常对象
	 */
	config.error = function (jqXHR, textStatus, errorThrown) {
		//请求超时处理
		if (textStatus == "timeout") {
			smart.showInfoTip('请求超时');
			return;
		}
		else {//其他异常处理
			var unexpectedException = false;//非预期的异常标志
			if (jqXHR.readyState == 4) {//请求完成，并且后台发来异常错误信息
				var text = jqXHR.responseText;
				/**
				 * 异常代码401，含义：未登录
				 * 处理方式：
				 * 1.用户点击重新登陆按钮，被系统带到登陆界面
				 * 2.用户点击留在当前界面，则关闭弹出框，继续留在当前
				 */
				if (jqXHR.status == 401) {

				}
				/**
				 * 异常代码403，含义：访问指定功能时权限不足
				 * 处理方式：
				 * 告知用户没有权限做此操作
				 */
				else if (jqXHR.status == 403) {
					smart.showInfoTip("权限不足");
					return;
				}
				/**
				 * 异常代码404，含义：未找到页面或功能
				 * 处理方式：
				 * 告知用户未找到页面或功能
				 */
				else if (jqXHR.status == 404) {
					smart.showErrorTip("路径未找到");
					return;
				}
				else if (jqXHR.status == 500) {//服务器异常
					//从html中截取有效地错误信息
					if (text.indexOf("<html>") >= 0) {
						var start = text.indexOf("<pre>"),
							end = text.indexOf("</pre>");
						text = text.substring(start, end + 6);
					}
					smart.showExceptionWindow(500, text);
				}
				/**
				 * 异常代码631，含义：出现业务异常
				 * 处理方式：
				 * 告知用户业务异常内容
				 */
				else if (jqXHR.status == 631) {
					smart.showExceptionWindow(631, text.substr(61));
				}
				/**
				 * 异常代码632，含义：校验异常
				 * 处理方式：
				 * 框架吸收该异常并将异常在界面中显示出来
				 */
				else if (jqXHR.status == 632) {
					var validateObj = Ext.JSON.decode(text);
					if (validateObj != null && path != null) {
						smart.processValidateData(validateObj, path);
					}
				}
				/**
				 * 异常代码633，
				 * 处理方式：
				 * 将异常信息展示出来
				 * 特意声明该异常原因：
				 * jersey框架的异常基类为WebApplicationException,该基类下面有3个直接子类,
				 *   (1)ConflictException 冲突异常  jersey默认抛出409编码，符合HTTP标准
				 *   (2)NotFoundException 方法未找到异常  jersey默认抛出404编码，符合HTTP标准
				 *   (1)ParamException 参数异常  jersey默认抛出404编码
				 *   可以看到参数异常导致的后台方法找不到会被jersey认为是找不到后台方法，
				 *   这样不利于我们去分析什么样的参数不对导致了后台错误，会延长对异常的分析时间，
				 *   为了更明确的获知错误明细，因此修改了jersey对paramException的默认处理
				 */
				else if (jqXHR.status == 633) {
					smart.showExceptionWindow(633, text);
				}
				else
					unexpectedException = true;
			}
			else {
				unexpectedException = true;
			}
			if (unexpectedException) {//出现非预期异常，将异常状态值、状态码和状态消息提示出来
				var readyStateText = "";
				if (jqXHR.readyState == 0) {
					readyStateText = "异常0";
				}
				else if (jqXHR.readyState == 1) {
					readyStateText = "异常1";
				}
				else if (jqXHR.readyState == 2) {
					readyStateText = "异常2";
				}
				else if (jqXHR.readyState == 3) {
					readyStateText = "异常3";
				}
				else if (jqXHR.readyState == 4) {
					readyStateText = "异常4";
				}
				smart.showErrorTip("异常", "&nbsp;&nbsp;&nbsp;异常信息" +
					": " + readyStateText + "<br/>&nbsp;&nbsp;&nbsp;异常代码： " + jqXHR.status
					+ "<br/>异常内容: " + jqXHR.statusText + "</br>如果状态码为200，请查看后台接口是否有返回值，如果没有返回值，ajax中的dataType请设置为text而非json！");
				return;
			}
		}
		//执行程序员的错误处理函数
		smart.exeFun(errorFun, jqXHR, textStatus, errorThrown);
	}
	//当用户取消开启框架错误函数处理时，关闭框架错误函数
	if (config.callFrameError === false) {
		config.error = errorFun;
	}
	//做数据请求
	config.cache = false;//取消请求缓存，修正ie系列浏览器下不更新数据的bug
	$.ajax(config);
}

smart.formAjaxError = function (hxr) {
	smart.hideLoading();
	var unexpectedException = false;//非预期的异常标志
	if (hxr.readyState == 4) {//请求完成，并且后台发来异常错误信息
		var text = hxr.responseText;
        /**
         * 异常代码401，含义：未登录
         * 处理方式：
         * 1.用户点击重新登陆按钮，被系统带到登陆界面
         * 2.用户点击留在当前界面，则关闭弹出框，继续留在当前
         */
		if (hxr.status == 401) {

		}
        /**
         * 异常代码403，含义：访问指定功能时权限不足
         * 处理方式：
         * 告知用户没有权限做此操作
         */
		else if (hxr.status == 403) {
			smart.showInfoTip("权限不足");
			return;
		}
        /**
         * 异常代码404，含义：未找到页面或功能
         * 处理方式：
         * 告知用户未找到页面或功能
         */
		else if (hxr.status == 404) {
			smart.showErrorTip("路径未找到");
			return;
		}
		else if (hxr.status == 500) {//服务器异常
			//从html中截取有效地错误信息
			if (text.indexOf("<html>") >= 0) {
				var start = text.indexOf("<pre>"),
					end = text.indexOf("</pre>");
				text = text.substring(start, end + 6);
			}
			smart.showExceptionWindow(500, text);
		}
        /**
         * 异常代码631，含义：出现业务异常
         * 处理方式：
         * 告知用户业务异常内容
         */
		else if (hxr.status == 631) {
			smart.showExceptionWindow(631, text.substr(61));
		}
        /**
         * 异常代码632，含义：校验异常
         * 处理方式：
         * 框架吸收该异常并将异常在界面中显示出来
         */
		else if (hxr.status == 632) {
			var validateObj = Ext.JSON.decode(text);
			if (validateObj != null && path != null) {
				smart.processValidateData(validateObj, path);
			}
		}
        /**
         * 异常代码633，
         * 处理方式：
         * 将异常信息展示出来
         * 特意声明该异常原因：
         * jersey框架的异常基类为WebApplicationException,该基类下面有3个直接子类,
         *   (1)ConflictException 冲突异常  jersey默认抛出409编码，符合HTTP标准
         *   (2)NotFoundException 方法未找到异常  jersey默认抛出404编码，符合HTTP标准
         *   (1)ParamException 参数异常  jersey默认抛出404编码
         *   可以看到参数异常导致的后台方法找不到会被jersey认为是找不到后台方法，
         *   这样不利于我们去分析什么样的参数不对导致了后台错误，会延长对异常的分析时间，
         *   为了更明确的获知错误明细，因此修改了jersey对paramException的默认处理
         */
		else if (hxr.status == 633) {
			smart.showExceptionWindow(633, text);
		}
		else
			unexpectedException = true;
	}
	else {
		unexpectedException = true;
	}
	if (unexpectedException) {//出现非预期异常，将异常状态值、状态码和状态消息提示出来
		var readyStateText = "";
		if (jqXHR.readyState == 0) {
			readyStateText = "异常0";
		}
		else if (jqXHR.readyState == 1) {
			readyStateText = "异常1";
		}
		else if (jqXHR.readyState == 2) {
			readyStateText = "异常2";
		}
		else if (jqXHR.readyState == 3) {
			readyStateText = "异常3";
		}
		else if (jqXHR.readyState == 4) {
			readyStateText = "异常4";
		}
		smart.showErrorTip("异常", "&nbsp;&nbsp;&nbsp;异常信息" +
			": " + readyStateText + "<br/>&nbsp;&nbsp;&nbsp;异常代码： " + jqXHR.status
			+ "<br/>异常内容: " + jqXHR.statusText + "</br>如果状态码为200，请查看后台接口是否有返回值，如果没有返回值，ajax中的dataType请设置为text而非json！");
		return;
	}
}

/**
 * 异常弹出
 */
smart.showExceptionWindow = function (code, text) {
	var title, bodyStyle;
	if (code == 500) {
		title = "服务异常";
	}
	if (code == 631) {
		title = "业务异常:" + text;
	}
	if (code == 633) {
		title = "数据异常";
	}
	smart.showErrorTip(title);
}

/**
 * @Title: 执行一个函数
 * @param fun 可以处理fun()字符串或者function(){...}两种方式
 * @return json字符串
 */
smart.exeFun = function (fun) {
	if (!fun) return null;
	if ((typeof fun) == "string") {
		return eval(fun);
	} else {
		if (typeof fun != "function") {
			return null;
		}
		if (arguments.length < 2) {
			return fun.apply({}, arguments);
		}
		var t = [];
		for (var i = 1; i < arguments.length; i++) {
			t.push(arguments[i]);
		}
		return fun.apply({}, t);
	}
}

/**
 * 弹出提示框
 */
smart.showInfoTip = function (info) {
	ZENG.msgbox.show(info, 1, 2000);
}
/**
 * 成功提示框
 */
smart.showSuccessTip = function (info) {
	ZENG.msgbox.show(info, 4, 2000);
}

/**
 * 错误提示框
 */
smart.showErrorTip = function (info) {
	ZENG.msgbox.show(info, 5, 3000);
}

/**
 * 显示遮罩
 */
smart.showLoading = function () {
	ZENG.mask.show();
}

/**
 * 关闭遮罩
 */
smart.hideLoading = function () {
	ZENG.mask.hide();
}

smart.validForm = function (formId) {
	var form = document.getElementById(formId);
	var a = form.elements.length;// 所有的控件个数
	var flag = true;
	for (var j = 0; j < a; j++) {
		$(form.elements[j]).removeClass('error');
		if (form.elements[j].validity && !form.elements[j].validity.valid) {
			$(form.elements[j]).addClass('error');
			flag = false;
		}
		// var regExp ;
		// var value = form.elements[j].value;
		// var required = form.elements[j].required;
		// var pattern = form.elements[j].pattern;
		// if(pattern){
		// 	regExp = new RegExp(eval(pattern));
		// }else{
		// 	regExp = null;
		// }
		// if(!value&&required){
		// 	$(form.elements[j]).addClass('error');
		// 	flag = false;
		// }else if(regExp&&regExp.test(value)){
		// 	$(form.elements[j]).removeClass('error');
		// }else if(regExp&&!regExp.test(value)){
		// 	$(form.elements[j]).addClass('error');
		// 	flag = false;
		// }else{
		// 	$(form.elements[j]).removeClass('error');
		// }
	}
	return flag;
}

/**
 * 获取form数据
 */
smart.getFormValues = function (formId) {
	var data = {};
	var form = document.getElementById(formId);
	var a = form.elements.length;// 所有的控件个数
	for (var j = 0; j < a; j++) {

		if (form.elements[j].type == 'radio' && !$(form.elements[j]).prop('checked')) {
			continue;
		}

		var name = form.elements[j].name;
		var value = form.elements[j].value;
		data[name] = value;
	}
	return data;
}

/**
 * form赋值
 */
smart.setFormValues = function (formId, data) {
	var form = document.getElementById(formId);
	var a = form.elements.length;// 所有的控件个数
	for (var j = 0; j < a; j++) {
		var name = form.elements[j].name;
		var value = data[name];
		if (value) {
			form.elements[j].value = value;
		}

	}
}

window.ZENG = window.ZENG || {};

ZENG.dom = {
	getById: function (id) {
		return document.getElementById(id);
	}, get: function (e) {
		return (typeof (e) == "string") ? document.getElementById(e) : e;
	}, createElementIn: function (tagName, elem, insertFirst, attrs) {
		var _e = (elem = ZENG.dom.get(elem) || document.body).ownerDocument.createElement(tagName || "div"), k;
		if (typeof (attrs) == 'object') {
			for (k in attrs) {
				if (k == "class") {
					_e.className = attrs[k];
				} else if (k == "style") {
					_e.style.cssText = attrs[k];
				} else {
					_e[k] = attrs[k];
				}
			}
		}
		insertFirst ? elem.insertBefore(_e, elem.firstChild) : elem.appendChild(_e);
		return _e;
	}
};

ZENG.string = {
	RegExps: { trim: /^\s+|\s+$/g, ltrim: /^\s+/, rtrim: /\s+$/, nl2br: /\n/g, s2nb: /[\x20]{2}/g, URIencode: /[\x09\x0A\x0D\x20\x21-\x29\x2B\x2C\x2F\x3A-\x3F\x5B-\x5E\x60\x7B-\x7E]/g, escHTML: { re_amp: /&/g, re_lt: /</g, re_gt: />/g, re_apos: /\x27/g, re_quot: /\x22/g }, escString: { bsls: /\\/g, sls: /\//g, nl: /\n/g, rt: /\r/g, tab: /\t/g }, restXHTML: { re_amp: /&amp;/g, re_lt: /&lt;/g, re_gt: /&gt;/g, re_apos: /&(?:apos|#0?39);/g, re_quot: /&quot;/g }, write: /\{(\d{1,2})(?:\:([xodQqb]))?\}/g, isURL: /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, cut: /[\x00-\xFF]/, getRealLen: { r0: /[^\x00-\xFF]/g, r1: /[\x00-\xFF]/g }, format: /\{([\d\w\.]+)\}/g }, commonReplace: function (s, p, r) {
		return s.replace(p, r);
	}, format: function (str) {
		var args = Array.prototype.slice.call(arguments), v;
		str = String(args.shift());
		if (args.length == 1 && typeof (args[0]) == 'object') {
			args = args[0];
		}
		ZENG.string.RegExps.format.lastIndex = 0;
		return str.replace(ZENG.string.RegExps.format, function (m, n) {
			v = ZENG.object.route(args, n);
			return v === undefined ? m : v;
		});
	}
};

ZENG.object = {
	routeRE: /([\d\w_]+)/g,
	route: function (obj, path) {
		obj = obj || {};
		path = String(path);
		var r = ZENG.object.routeRE, m;
		r.lastIndex = 0;
		while ((m = r.exec(path)) !== null) {
			obj = obj[m[0]];
			if (obj === undefined || obj === null) {
				break;
			}
		}
		return obj;
	}
};

if (typeof (ZENG.msgbox) == 'undefined') {
	ZENG.msgbox = {};
}
ZENG.msgbox._timer = null;
ZENG.msgbox.loadingAnimationPath = ZENG.msgbox.loadingAnimationPath || ("loading.gif");
ZENG.msgbox.show = function (msgHtml, type, timeout, opts) {

	if ($('#mode_tips_v2').length > 0 && $('#mode_tips_v2').css('display') != 'none') {
		return;
	}
	if (typeof (opts) == 'number') {
		opts = { topPosition: opts };
	}
	opts = opts || {};
	var _s = ZENG.msgbox,
		template = '<span class="zeng_msgbox_layer" style="display:none;z-index:10000;" id="mode_tips_v2"><span class="gtl_ico_{type}"></span>{loadIcon}{msgHtml}<span class="gtl_end"></span></span>', loading = '<span class="gtl_ico_loading"></span>', typeClass = [0, 0, 0, 0, "succ", "fail", "clear"], mBox, tips;
	_s._loadCss && _s._loadCss(opts.cssPath);
	mBox = ZENG.dom.get("q_Msgbox") || ZENG.dom.createElementIn("div", document.body, false, { className: "zeng_msgbox_layer_wrap" });
	mBox.id = "q_Msgbox";
	mBox.style.display = "";
	mBox.innerHTML = ZENG.string.format(template, { type: typeClass[type] || "hits", msgHtml: msgHtml || "", loadIcon: type == 6 ? loading : "" });

	if (timeout) {
		$('#mode_tips_v2').fadeIn(500).animate({ top: '50px' }).delay(timeout).fadeOut(500);
	} else {
		$('#mode_tips_v2').fadeIn(500);
	}
};

if (typeof (ZENG.mask) == 'undefined') {
	ZENG.mask = {};
}
ZENG.mask.show = function (txt) {
	var _s = ZENG.mask,
		// ht = '<span class="zeng_mask_layer" style="display:none;position:absolute;top: 0;left: 0;width: 100%;height:100%;text-align:center;vertical-align:middle;background-color:#000;opacity:0.5;z-index:10000;" id="mode_mask_v2">' +
		// '<span style="position:absolute;margin-top: calc(25% - 40px)">'+
		// '<i class="fa fa-spinner fa-pulse fa-5x" aria-hidden="true"></i>' +
		// '<br/><span style="font-size: 15px;margin-top: 3px;">数据提交中,请稍候...</span></span>'+
		// '</span>';
		ht = '<div class="zeng_mask_layer" style="display:none;position:absolute;top: 0;left: 0;width: 100%;height:100%;z-index: 100000" id="mode_mask_v2">' +
			'	<div style="opacity: 0.5;width:  100%;height: 100%;background-color:  #000;position: absolute;"></div>' +
			// '	<div style="width: 100%;text-align: center;margin-top: calc(23% - 20px)">' +
			'	<div style="width: 100%;text-align: center;margin-top: {mt}px;color:#fff;opacity: 0.9">' +
			'		<i class="fa fa-spinner fa-pulse fa-5x" aria-hidden="true"></i>' +
			'		<div style="font-size: 15px;margin-top: 3px;">{txt}...</div>' +
			'	</div>' +
			'</div>'

	var maskDom = ZENG.dom.get("q_mask") || ZENG.dom.createElementIn("div", document.body, false, { className: "zeng_mask_layer_wrap" });
	maskDom.id = "q_mask";
	maskDom.style.display = "";
	maskDom.innerHTML = ZENG.string.format(ht, { txt: txt || 'loading', mt: $('body').height() / 2 - 20 });;
	$('#mode_mask_v2').show();
}

ZENG.mask.hide = function () {
	var _s = ZENG.mask;
	var maskDom = ZENG.dom.get("q_mask");
	if (maskDom) {
		maskDom.style.display = "none";
	}

}
//模态框拖拽
$.getScript("./resources/common/js/Tdrag.js");


smart.getCurformatDateTime = function () {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '/' + m + '/' + d + ' ' + h + ':' + minute;
};