// (function(){

	function btnClick(node){
		var number = node.attr('attr-number');
		var name = node.find('span').text();
		var url = node.attr('attr-url');
		var parentW = $('.ct-tab-heade-wrap').width();
		var contentW = $('#myTab').width();
		var l = parseInt( $('#myTab').css('left') );

		$('#sidebar ul>li').removeClass('active')
		node.parent().addClass('active');

		var fs = node.find('i').attr('class');

		var liClassStr = 'tab-header-num'+ number;
		if( ! $('#myTab li').hasClass(liClassStr) ){
			var tab_header = '<li class="'+ liClassStr +'">'
							// +	'<i class="'+ fs +'"></i>'
							+	'<a data-toggle="tab" class="'+ fs +'" attr-hash="tab-ct-'+ number +'" href="#tab-ct-'+ number +'">'+ name +'</a>'
							+	'<em class="tab-header-close">×</em>'
							// +	'<em class="tab-header-close fa fa-close"></em>'
							+'</li>'
			var tab_body = '<div id="tab-ct-'+ number +'" class="tab-pane">'
						 +		'<iframe src="'+ url +'" frameborder="0"></iframe>'			
						 + '</div>'
			$('#myTab').append(tab_header);
			$('#tab-content-ct').append(tab_body);
			contentW = $('#myTab').width();
			//新标签溢出时整体定位使其显示出来
			if( contentW > parentW ){
				console.log(parentW - contentW)
				$('#myTab').css('left', parentW - contentW)
			}
			
		}else{
			//旧标签被淹没时，再次点击使其显示在可视区内
			var len = $('.'+ liClassStr).index();
			var total = 0;
			var liClassStrWidth = $('.'+ liClassStr).width();

			for (var i = 0; i < len; i++) {
				total += $('.myTab-wrap>ul>li').eq(i).width();
			}

			if( total < (-l) ){
				$('#myTab').css('left', -total);
			}else if( -l + parentW < total + liClassStrWidth){
				$('#myTab').css('left', parentW -  total - liClassStrWidth);
			}
		}
			
		$('.'+ liClassStr + ' a').click();
		showPrevNext();
	}

	// 动态修改内容高度
	function contentHeight(){
		var navbarH = $('#navbar').height();
		var footerH = 40;
		var documentH = $(window).height();

		$('.main-content').height( documentH - navbarH - footerH );
	}
	
	// 动态显示头部前进后退按钮
	function showPrevNext(){
		var parentW = $('.ct-tab-heade-wrap').width();
		var contentW = $('#myTab').width();
		var l = parseInt( $('#myTab').css('left') );

		if( parentW >= contentW ){
			$('.scroll-prev').hide();
			$('.scroll-next').hide();
			$('#myTab').css({left : 0});
		}else{
			$('.scroll-prev').show();
			$('.scroll-next').show();
			if( l < (parentW - contentW) ){
				$('#myTab').css({left : parentW - contentW});
			}
		}
	}
	// 点击nav，当头部导航过多溢出
	/*function navOverflow(){

	}*/

	// 点击左侧nav
	$('.ct-nav-btn').on('click', function(){
		btnClick($(this))
	});

	// 点击头部删除
	$('.tabbable').on('click', '.tab-header-close', function(){
		var hash = $(this).siblings().attr('attr-hash');
		var isActive = $(this).siblings().attr('aria-expanded');
		var index = $(this).parent().index();
		var length = 0;

		$(this).parent().remove();
		$('#'+ hash).remove();

		length = $('#myTab').length;

		if( isActive == 'true' && length > index ){
			$('#myTab li').eq(index).find('a').click();
		}else if( isActive == 'true' && length <= index ){
			$('#myTab li:last a').click();
		}
	});

	var step = 100;

	$('.scroll-next').on('click', function(){
		var pw = $('.ct-tab-heade-wrap').width(); //父级宽度
		var w = $('#myTab').width();
		var l = parseInt( $('#myTab').css('left') );
		
		if( ( w - pw ) >= ( step - l ) ){
			$('#myTab').css({left : l - step});
		}else{
			$('#myTab').css({left : pw - w});
		}
	});

	$('.scroll-prev').on('click', function(){
		var pw = $('.ct-tab-heade-wrap').width(); //父级宽度
		var w = $('#myTab').width();
		var l = parseInt( $('#myTab').css('left') );
		
		if( l + step < 0 ){
			$('#myTab').css({left : l + step});
		}else{
			$('#myTab').css({left : 0});
		}

	});

	var cTimer = null;
	$(window).on('resize', function(){
		clearTimeout(cTimer);
		cTimer = setTimeout(function(){
			contentHeight();
			showPrevNext();
		}, 300);
	})


	//初始化
	contentHeight();
	showPrevNext();
// })();
$("#ace-settings-toppostion").click(function(){
	var checked = $(this).is(':checked');
	if(checked){
		$('.menu-top').show();
		$('.menu-top').animate({marginTop:"0px"},200);
		$('#sidebar').animate({marginLeft:"-195px"},190);
		$('.main-content , .footer-inner').animate({marginLeft:"0px"},200);
		$('.footer-inner').animate({left:'0px'},200);
	}else{
		var sideBarWidth = $('#sidebar').css('width');
		$('.menu-top').animate({marginTop:"-60px"},200);
		$('.main-content').animate({marginLeft:sideBarWidth},190);
		$('#sidebar').animate({marginLeft:"0px"},200);
		$('.footer-inner').animate({left:sideBarWidth},200);
		$('.menu-top').hide(100);
	}
});	

$('#sidebar').resize(function(){
	var sideBarWidth = $(this).css('width');
	var ml = $(this).css('margin-left');
	if(ml!="-195px"){
		$('.main-content').animate({marginLeft:sideBarWidth},0);
		$('.footer-inner').animate({left:sideBarWidth},0);
	}
	
});









