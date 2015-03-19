// JavaScript Document
/* 
 * JS Document for ccb mobile
 * wen_slide.js
 * Date: 2013-04-25
 */

 
(function($){
	$.fn.wen_slide = function(options){
		var obj = $.extend({},$.fn.wen_slide.defaultVal,options);
		function init(element){
			var $this = $(element);
			var self = this;
			self.n = 1;
			self.m = 1;
			self.o =0;
			self.r_l = "right";
			self.wrapper = $this.children(".wen_wrapper");
			self.li = self.wrapper.children(".wen_move").children("li");
			self.ul = self.wrapper.children(".wen_move");
			self.page = $this.children(".wen_page").find("span");
			self.li_1 = self.li.eq(0);
			self.wrapper_w = $this.children(".wen_wrapper").width();
			self.wrapper_h = $this.children(".wen_wrapper").height();
			self.li_w = self.li_1.outerWidth(true);
			self.li_h = self.li_1.outerHeight(true);
			self.ul.width(self.li_w*self.li.length);
			self.ml = self.li_w;
			self.mt = self.li_h;
			self.li_n = self.li.length;
			self.eff = obj.effect;
			self.eff_copy = self.eff;
			self.move = false;
			if(obj.page_copy){
				if(self.li.length <= 1){
					//return false;
					self.li.clone().appendTo(self.ul).clone().appendTo(self.ul);
					self.ul = $this.children(".wen_wrapper").children(".wen_move")
					self.li = self.ul.children("li");
					self.ul.width(self.li_w*self.li.length);
					self.page = $this.children(".wen_page").find("span");
					self.li_n = self.li.length;
				}else if(self.li.length == 2 && obj.drag){
					self.li.clone().appendTo(self.ul);
					self.ul = $this.children(".wen_wrapper").children(".wen_move")
					self.li = self.ul.children("li");
					self.ul.width(self.li_w*self.li.length);
					self.page = $this.children(".wen_page").find("span");
					self.li_n = self.li.length;
				};
			}else{
				if(self.li.length <= 1){
					//$this.children(obj.pre_page).hide();
					//$this.children(obj.next_page).hide();
					return false;
				};
			};
			if(self.eff == "play1"){
				self.ul.css({"width":"auto"});
				self.li.css({"opacity":"0","float":"none","position":"absolute","top":0,"left":0});
				self.li.eq(0).css({"z-index":"101","opacity":"1"});
			};
			if(parseInt(navigator.userAgent.slice(navigator.userAgent.indexOf("MSIE")+5,navigator.userAgent.indexOf("MSIE")+8))<9){
				obj.drag = false;
			};
			//默认上下按钮隐藏，鼠标移进显示
			if(obj.pre_next){
				$this.children(obj.pre_page).hide();
				$this.children(obj.next_page).hide();
				$this.hover(function(){
					$this.children(obj.pre_page).stop(true,true).fadeIn("slow");
					$this.children(obj.next_page).stop(true,true).fadeIn("slow");
				},function(){
					$this.children(obj.pre_page).fadeOut("slow");
					$this.children(obj.next_page).fadeOut("slow");
				});
			};
			//点击页码
			
			self.page.click(function(){
				var index = $(this).index()+1;
				var index1 = self.page.filter("."+obj.page_style).index();
				self.r_l = (index-1)-index1>0?"right":(index-1)-index1==0?0:"left";
				if(! self.ul.is(":animated") && ! self.li.is(":animated")){
					if(obj.page_style!=""){
						$(this).addClass(obj.page_style).siblings().removeClass(obj.page_style);
					}
				};
				init.play(self,index);
			});
			
			//点击上一页、下一页
			$this.children(obj.pre_page).click(function(){
				init.play(self,"pre");
			}).hover(function(){
				if(obj.page_style!=""){
					$(this).addClass(obj.page_style);
				}
			},function(){
				if(obj.page_style!=""){
					$(this).removeClass(obj.page_style);
				}
			});
			$this.children(obj.next_page).click(function(){
				
				init.play(self,"next");
			}).hover(function(){
				if(obj.page_style!=""){
					$(this).addClass(obj.page_style);
				}
			},function(){
				if(obj.page_style!=""){
					$(this).removeClass(obj.page_style);
				}
			});
			//自动播放
			if(obj.autoplay){
				auto_play = window.setInterval(function(){
								init.play(self,"next");
							}, obj.auto_speed);
				$this.hover(function(){
					clearInterval(auto_play);
				},function(){
					auto_play = window.setInterval(function(){
									init.play(self,"next");
								}, obj.auto_speed);
				})
			};
			//鼠标拖动
			if(obj.drag){
				self.ul.children("li").last().prependTo(self.ul);
				self.li = self.ul.children("li");
				self.o = -self.li_w;
				self.ml = self.li_w*2;
				self.ul.css({"marginLeft":self.o});
				$this.children("div.wen_wrapper").mousedown(function(e){
					self.x_str = e.pageX;
					self.y_str = e.pageY;
					self.ml_old = parseInt(self.ul.css("marginLeft"));
					self.move = true;
					self.add = true;
					self.add1 = true;
					return false;
				}).mousemove(function(e){
					if(self.move){
						self.x_end = e.pageX;
						self.y_end = e.pageY;
						self.x_new = self.x_end-self.x_str;
						self.ml_new = self.x_new+self.ml_old;
						self.ul.css({"marginLeft":self.ml_new});
					};
				}).mouseup(function(e) {
					if(self.move){
						_move(self);
					}
					if(typeof(obj.wen_back) == "function"){//回调
						obj.wen_back(self,n);//把self传给回调函数，就可以执行self.next()
					};
					self.move=false;
				}).mouseleave(function(){
					if(self.move){
						_move(self);
					}
					if(typeof(obj.wen_back) == "function"){//回调
						obj.wen_back(self,n);//把self传给回调函数，就可以执行self.next()
					};
					self.move=false;
				});
				function _move(self){
					if(self.x_new > obj.drag_l){
						self.ul.animate(obj.rotation=="left"?{"marginLeft":0}:{"marginTop":0},obj.speed/3,function(){
							self.ul.children("li").last().prependTo(self.ul);
							self.ul.css({"marginLeft":self.o});
						});
					}else if(self.x_new < -obj.drag_l){
						self.ul.animate(obj.rotation=="left"?{"marginLeft":-self.ml}:{"marginTop":-self.mt},obj.speed/3,function(){
							self.ul.append(self.ul.children("li").first());
							self.ul.css({"marginLeft":self.o});
						});
					}else if(self.x_new==0||self.x_new==undefined){
						self.ul.animate(obj.rotation=="left"?{"marginLeft":self.o}:{"marginTop":self.o},obj.speed/2);
					}else{
						self.ul.animate(obj.rotation=="left"?{"marginLeft":self.o}:{"marginTop":self.o},obj.speed/2);
					};
					self.x_new=0;
				};
			};
		};
		
		//方法
		$.extend(init,{
			pre:function(){
				init.play(self,"pre");
			},
			next:function(){
				init.play(self,"next");
			},
			play:function(self,a){
				//如果元素处理动画当中则不执行
				if(! self.ul.is(":animated") && ! self.li.is(":animated")){
					//获取当前元素序号: n
					if(a == "next"||a == "undefined"){
						if(self.n < self.li_n){
							self.n++;
						}else{
							self.n=1;
						};
					}else if(a == "pre"){
						if(self.n <= 1){
							self.n=self.li_n;
						}else{
							self.n--;
						};
					}else if(typeof a == "number"){
						if(0<a && a<=self.li_n){
							self.n=a;
						}else{
							alert("超出范围");
							return false;
						};
					};
					
					//当前页码样式
					//self.page.removeClass("wen_this").eq(self.n-1).addClass("wen_this");
					//根据不同动画类型执行对应操作
					switch(self.eff){
						case "play0":
							var self_li = self.ul.children("li");
							if(a == "next"||a == undefined){
								if(typeof(obj.wen_back_start) == "function"){
									obj.wen_back_start(self,"next");
								};
								self.li.eq(self.n-1).insertAfter(self_li.first());
								self.ul.animate(obj.rotation=="left"?{"marginLeft":-self.ml}:{"marginTop":-self.mt},obj.speed,function(){
									self_li.first().appendTo(self.ul);
									self.ul.css(obj.rotation=="left"?{"marginLeft":self.o}:{"marginTop":self.o});
									if(typeof(obj.wen_back) == "function"){//回调
										obj.wen_back(self);
									};
								});
							};
							if(a == "pre"){
								if(typeof(obj.wen_back_start) == "function"){
									obj.wen_back_start(self,"pre");
								};
								self.li.eq(self.n-1).insertBefore(self_li.first());
								//self_li.last().prependTo(self.ul);
								self.ul.css(obj.rotation=="left"?{"marginLeft":-self.ml}:{"marginTop":-self.mt});
								self.ul.animate(obj.rotation=="left"?{"marginLeft":self.o}:{"marginTop":self.o},obj.speed,function(){
									if(typeof(obj.wen_back) == "function"){//回调
										obj.wen_back(self);
									};
								});
							};
							if(typeof a == "number"){
								if(self.r_l == "right"){
									self.li.eq(self.n-1).insertAfter(self_li.first());
									self.ul.animate(obj.rotation=="left"?{"marginLeft":-self.ml}:{"marginTop":-self.mt},obj.speed,function(){
									self_li.first().appendTo(self.ul);
									self.ul.css(obj.rotation=="left"?{"marginLeft":self.o}:{"marginTop":self.o});
										if(typeof(obj.wen_back) == "function"){//回调
											obj.wen_back(self);
										};
									});
								}else if(self.r_l == "left"){
									self.li.eq(self.n-1).insertBefore(self_li.first());
									self.ul.css(obj.rotation=="left"?{"marginLeft":-self.ml}:{"marginTop":-self.mt});
									self.ul.animate(obj.rotation=="left"?{"marginLeft":self.o}:{"marginTop":self.o},obj.speed,function(){
										if(typeof(obj.wen_back) == "function"){//回调
											obj.wen_back(self);
										};
									});
								}else if(self.r_l == 0){
									return false;
								};
							};
							self.page.eq(self.n-1).addClass(obj.page_style).siblings().removeClass(obj.page_style);
							break;
						case "play1":
							self.li.eq(self.n-1).animate({opacity:1,zIndex:101},obj.speed).siblings().animate({opacity:0,zIndex:100},obj.speed);
							if(typeof(obj.wen_back) == "function"){
								obj.wen_back(self);
							};
							break;
						default:
							//alert("动画类型 effect:的值可能填错了，记得用引号括起来");
					}
				};
				
			}
		});
		return this.each(function(i,tag){
			
			oa = new init(this);
		});
	};
	$.fn.wen_slide.defaultVal = {
		pre_page:".wen_pre_page",           //上一个标签:#xxx/.xxx
		next_page:".wen_next_page",         //下一个标签:#xxx/.xxx
		speed:800,                     		//过渡时间：越大越慢
		rotation:"left",               		//可选项：left\top
		autoplay:false,                		//自动播放：true(是)/false(否)
		auto_speed:3000,               		//自动播放时间间隔：越大停留时间越久
		effect:"play0",			       		//动画类型，随机random
		tartan:19,                     		//块数
		tartan_speed:300,              		//块的过渡时间
		tartan_speed1:100,             		//块的过渡间隔
		drag:false,                         //是否可拖动
		drag_l:200,                         //拖动多长距离切换
		pre_next:true,                      //上下按钮是否可以隐藏
		page_copy:true,					    //复制页
		page_style:"",                      //当前页码样式
		wen_back:"",                   		//回调1(动画结束)
		wen_back_start:""                   //回调2（动画开始前）
	};
})(jQuery);

/*====
    <!--结构1-->
     <div class="relative" id="recomend">
         <div class="wen_wrapper" id="recomend_box">
             <ul class="wen_move clearfix">
                 <li><a href="#"><img src="images/ad1.jpg" alt="" /></a></li>
                 <li><a href="#"><img src="images/ad1.jpg" alt="" /></a></li>
                 <li><a href="#"><img src="images/ad1.jpg" alt="" /></a></li>
                 <li><a href="#"><img src="images/ad1.jpg" alt="" /></a></li>
             </ul>
         </div>
         <div class="pre_page"></div>
         <div class="next_page"></div>
     </div>
    <!--结构2-->
     <div class="popup_app_pic">
         <div class="wen_wrapper">
             <ul class="wen_move">
                 <li><img src="images/ico1.jpg" alt="" /></li>
                 <li><img src="images/ico1_1.jpg" alt="" /></li>
                 <li><img src="images/ico1_2.jpg" alt="" /></li>
             </ul>
         </div>
         <div class="wen_page">
             <span class="n_this"></span>
             <span></span>
             <span></span>
         </div>
     </div>

     <script type="text/javascript">
         $("#recomend").wen_slide({
             speed:800,
             pre_page:".pre_page",
             next_page:".next_page",
             page_style:"n_this",
             drag:true
         });
         $(".popup_app_pic").wen_slide({
             speed:800,
             effect:"play1",
             page_style:"n_this",
             page_copy:false
         });
     </script>
====*/