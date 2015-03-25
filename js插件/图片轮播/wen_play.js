// JavaScript Document
/* 
 * JS Document for xxx
 * wen
 * copyright wen
 * email:yellowwen@126.com
 * Date: 2013-04-25
 * 轮播插件，支持左右切换及渐变切换。
 *----html-----------------------------------
 <div class="wen_play" id="wen_play">
	<div class="wen_play_body">
        <ul class="wen_play_box clearfix">
            <li class="play_list">1</li>
            <li class="play_list">2</li>
            <li class="play_list">3</li>
            <li class="play_list">4</li>
            <li class="play_list">5</li>
            <li class="play_list">6</li>
        </ul>
    </div>
 </div>
 *
 *----style----------------------------------
 <style>
	.wen_play{
		width:500px;
		height:200px;
		margin:100px auto;
		position:relative;
	}
	.wen_play_body{
		width:500px;
		height:200px;
		position:relative;
		overflow:hidden;
	}
	.wen_play_box{
		position:absolute;
		z-index:10;
	}
	.wen_play_box .play_list{
		height:200px;
		width:500px;
		line-height:200px;
		text-align:center;
		float:left;
		font-size:40px;
		display:inline;
		background-color:green;
		color:#fff;
	}
	.wen_pre_page,.wen_next_page{
		height:48px;
		width:48px;
		text-align:center;
		line-height:48px;
		color:#fff;
		background-color:rgba(0,0,0,0.3);
		position:absolute;
		z-index:10;
		top:50%;
		cursor:pointer;
		margin-top:-24px;	
	}
	.wen_pre_page{
		left:0;
	}
	.wen_next_page{
		right:0;
	}
	.wen_page{
		position:absolute;
		z-index:101;
		bottom:10px;
		right:10px;
	}
	.wen_page span{
		display:inline-block;
		height:20px;
		width:20px;
		text-align:center;
		line-height:20px;
		cursor:pointer;
		margin-left:5px;
		background-color:rgba(255,255,255,0.8);
	}
	.wen_page span.current{
		background-color:red;
		color:#fff;
		font-weight:bold;	
	}
 </style>
 *
 *
 */
 
(function($){
	$.fn.wen_play = function(options){
		var defaultVal = {
			show_n : "1",	
			play_list:".play_list",			//定义第一层的LI列表，这样子项里面就算有其它的LI也不会受影响	
			page_show:"pre_next",			//页码显示方式决定了切换方式，"pre_next"/"num"/"num_opacity/mixture"
			pre_page:"wen_pre_page",		//上面选择"pre_next"才要设置上按钮的样式
			next_page:"wen_next_page",		//上面选择"pre_next"才要设置下按钮的样式
			hover:false,					//上面选择"pre_next"才要设置是否隐藏上下按钮，鼠标移到其上显示
			speed:800,						//切换时间间隔
			autoplay:false,					//是否为自动播放
			autospeed:3000,					//自动播放时间间隔
			star_fn:"",						//回调切换开始前；选择"pre_next",才会有第三个参数
			end_fn:""						//回调切换开始后；参数：$li列表、n当前页、pre/next点了上还是下
		};
		var obj = $.extend(defaultVal,options);
		return this.each(function(){
			var $this = $(this);
			var i = 1,n=0,autoplay,i_auto = 0;
			var $li = $this.find(obj.play_list);
			var $li_1 = $li.eq(0);
			var li_w = $li_1.outerWidth(true);
			var li_n = $li.length;
			var $ul = $this.find(".wen_play_box");
			$ul.width(Math.ceil(li_w*li_n));
			if(li_n <= obj.show_n){
				return false;
			};
			if(obj.page_show == "pre_next" || obj.page_show == "mixture"){
				var page_html = '<div class="'+obj.pre_page+'">pre</div><div class="'+obj.next_page+'">next</div>';
				$this.append(page_html);
				
				$this.children('.'+obj.pre_page).click(function(){
					if(obj.page_show == "mixture"){
						if(i_auto-1 < 0){i_auto = li_n-1;}else{i_auto--};
						play.num(i_auto);
						//console.log(i_auto);
						$this.children(".wen_page").children("span").eq(i_auto).addClass("current").siblings().removeClass("current");
					}else{
						play.pre();
					}
					
				});
				$this.children('.'+obj.next_page).click(function(){
					if(obj.page_show == "mixture"){
						if(i_auto+1 >= li_n){i_auto = 0;}else{i_auto++};
						play.num(i_auto);
						//console.log(i_auto);
						$this.children(".wen_page").children("span").eq(i_auto).addClass("current").siblings().removeClass("current");
					}else{
						play.next();
					}
				});
				if(obj.hover){
					$(this).children('.'+obj.pre_page).hide();
					$(this).children('.'+obj.next_page).hide();
					$this.hover(function(){
						$(this).children('.'+obj.pre_page).fadeIn();
						$(this).children('.'+obj.next_page).fadeIn();
					},function(){
						$(this).children('.'+obj.pre_page).fadeOut();
						$(this).children('.'+obj.next_page).fadeOut();
					});
				};
			}
			if(obj.page_show == "num" || obj.page_show == "num_opacity" || obj.page_show == "mixture"){
				var page = [];
				for(var i=0;i<li_n;i++){
					if(i>0){
						page.push('<span>'+(i+1)+'</span>');
					}else{
						page.push('<span class="current">'+(i+1)+'</span>');
					}
				}
				var page_html = '<div class="wen_page">'+page.join("")+'</div>';
				$this.append(page_html);
				$li.css({"position":"absolute"}).hide().eq(0).show();
				$this.children(".wen_page").children("span").click(function(){
					i_auto = $(this).index();
					if(! $li.is(":animated")){
						$(this).addClass("current").siblings().removeClass("current");
						if(obj.page_show == "num" || obj.page_show == "mixture"){
							play.num(i_auto);
						}else{
							play.num_opacity(i_auto);
						}
					}
				});
			};
			if(obj.autoplay){
				//var i_auto = 0;
				var _play = true;
				$this.hover(function(){
					window.clearInterval(autoplay);
					_play = false;
				},function(){
					_play = true;
					if(obj.page_show == "pre_next" || obj.page_show == "mixture"){
						autoplay = window.setInterval(function(){
							$this.children('.'+obj.next_page).trigger("click");
						},obj.autospeed);
					}else if(obj.page_show == "num" || obj.page_show == "num_opacity"){
						autoplay = window.setInterval(function(){
							$this.children(".wen_page").children("span").eq(i_auto).trigger("click");
							//console.log(i_auto);
							i_auto++
							if(i_auto>li_n-1){
								i_auto = 0;	
							}
						},obj.autospeed);
					}
				})
				$this.trigger("mouseleave");
			}
			//动画类型
			var play = {
				/*option:{
					$new_li:$this.find(obj.play_list),
					li_w:$new_li.eq(0).outerWidth(true)
				},*/
				next:function(){
					var $new_li=$this.find(obj.play_list),
					li_w=$new_li.eq(0).outerWidth(true);
					if(! $ul.is(":animated")){
						if(n<li_n-1){
							++n;
						}else{
							n=0;
						}
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n,"next");	
						}
						$ul.animate({"left":-li_w},obj.speed,function(){
							$new_li.first().appendTo($ul);
							$ul.css({"left":"0"});
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n,"next");	
							}
						});
					};
				},
				pre:function(){
					var $new_li=$this.find(obj.play_list),
					li_w=$new_li.eq(0).outerWidth(true);
					if(! $ul.is(":animated")){
						if(n<=0){
							n=li_n-1;
						}else{
							--n;
						};
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n,"pre");	
						}
						$new_li.last().prependTo($ul);
						$ul.css({"left":-li_w});
						$ul.animate({"left":"0"},obj.speed,function(){
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n,"pre");	
							}
						});	
					};
				},
				num:function(n){
					//var $new_li=$this.find(obj.play_list);
					//var li_w=$new_li.eq(0).outerWidth(true);
					if(! $li.is(":animated")){
						var v1 = $li.filter(":visible").index();
						if(v1 === n){return false;};
						
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n);	
						}
						if(v1 < n || _play){
							$li.filter(":visible").animate({"left":-li_w},obj.speed,function(){
								$(this).hide().css({"left":0});
							});
							$li.eq(n).css({"left":li_w}).show().animate({"left":0},obj.speed,function(){
								if(typeof obj.end_fn == "function"){
									obj.end_fn($li,n);	
								}
							});
						}else if(v1 > n){
							$li.filter(":visible").animate({"left":li_w},obj.speed,function(){
								$(this).hide().css({"left":0});
							});
							$li.eq(n).css({"left":-li_w}).show().animate({"left":0},obj.speed,function(){
								if(typeof obj.end_fn == "function"){
									obj.end_fn($li,n);	
								}
							});
						}
						
					}
				},
				num_opacity:function(n){
					if(! $li.is(":animated")){
						if(typeof obj.star_fn == "function"){
							obj.star_fn($li,n);	
						}
						$li.eq(n).fadeIn(obj.speed,function(){
							if(typeof obj.end_fn == "function"){
								obj.end_fn($li,n);	
							}
						}).siblings().fadeOut(obj.speed);	
					}
				}
			};
		});
	};
})(jQuery);