/*
$("预加载对象").scrollLoading({
	attr: "data-url",		//加载对象地址
	bg:"data-bg",			//值为true,侧用作背景
	container: $(window),	//容器
	callback: $.noop		//回调$.noop为空函数
});
*/

(function($) {
	$.fn.scrollLoading = function(options) {
		var defaults = {
			attr: "data-url",
			bg:"data-bg",
			container: $(window),
			callback: $.noop
		};
		var params = $.extend({}, defaults, options || {});
		params.cache = [];
		$(this).each(function() {
			var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]), bg = $(this).attr(params["bg"]);
			//重组
			var data = {
				obj: $(this),
				tag: node,
				url: url,
				bg: bg
			};
			params.cache.push(data);
		});
		
		var callback = function(call) {
			if ($.isFunction(params.callback)) {
				params.callback.call(call.get(0));
			}
		};
		//动态显示数据
		var loading = function() {
			
			var contHeight = params.container.height();
			if (params.container.get(0) === window) {
				contop = $(window).scrollTop();
			} else {
				contop = params.container.offset().top;
			}		
			
			$.each(params.cache, function(i, data) {
				var o = data.obj, tag = data.tag, url = data.url, bg = data.bg, post, posb;
				
				if (o) {
					post = o.offset().top - contop, posb = post + o.height();
					if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
						if (url) {
							//在浏览器窗口内
							if (tag === "img") {
								var tmp_image = new Image();
								tmp_image.onload = tmp_image.onerror = function(){
									//图片，改变src
									callback(o.attr("src", url));
								};
								tmp_image.src = url;
									
							}else if(bg == "true"){
								var tmp_image = new Image();
								tmp_image.onload = tmp_image.onerror = function(){
									callback(o.css({"background-image": 'url('+url+')'}));	
								};
								tmp_image.src = url;	
							}else {
								o.load(url, {}, function() {
									callback(o);
								});
							}		
						} else {
							// 无地址，直接触发回调
							callback(o);
						}
						data.obj = null;	
					}
				}
			});	
		};
		
		//事件触发
		//加载完毕即执行
		loading();
		//滚动执行
		params.container.bind("scroll", loading);
	};
})(jQuery);