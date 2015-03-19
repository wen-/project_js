// JavaScript Document
require.config({
	enforceDefine: true,//从CDN加载jq，如果出错就选备用本地地址
	paths:{
		"jquery":["http://libs.baidu.com/jquery/1.9.1/jquery","jquery-1.9.1.min"]
		//"jquery.wenplay":"wen_play"
		,"a1":"../css/a1.css"
	}
	/*shim:{
		'jquery.wenplay': {
            deps: ['jquery'],
			exports: 'wen_play'
        }
	}*/
});
define(['jquery','box'],function($,box){
	box.box1();
	

});