// JavaScript Document
define(['jquery','wen_play','text!a1'],function($,w,css){
	var box1 = function(){
		alert("box1");
	}
	var box2 = function(){
		alert("box2");
	}
	//$(function(){
		//console.log(css);
		if(document.all){ 
			window.style=css; 
			document.createStyleSheet("javascript:style"); 
		}else{ 
			var style = document.createElement('style'); 
			style.type = 'text/css'; 
			style.innerHTML=css; 
			document.getElementsByTagName('HEAD').item(0).appendChild(style); 
		} 
		$("#wen_play").wen_play({
			show_n : "1",
			page_show:"num_opacity",
			speed:800,
			autoplay:true,
			star_fn:function(element,n,l_r){
				//console.log(element.eq(n).html());	
				//abc(element,n,l_r);
			},
			end_fn:function(element,n){
				//console.log(element.eq(n).html());	
			}
		});
	//});
	return {
		"box1":box1,
		"box2":box2
	}
});