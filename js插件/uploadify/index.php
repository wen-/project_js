<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>UploadiFive Test</title>
<script src="jquery-1.9.1.min.js" type="text/javascript"></script>
<script src="jquery.uploadify.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="uploadify.css">
<style type="text/css">
body {
	font: 13px Arial, Helvetica, Sans-serif;
}
</style>
</head>

<body>
	<h1>Uploadify Demo</h1>
	<form>
		<div id="queue"></div>
		<!--<input id="file_upload" name="file_upload" type="file" multiple="true">-->
        <span id="file_upload"></span>
	</form>

	<script type="text/javascript">
		<?php $timestamp = time();?>
		$(function() {
			window.setTimeout(function(){
				//解决谷歌浏览器崩溃问题（浏览器缓存机制导致）
			
				$('#file_upload').uploadify({
					auto : true,                // 设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传 $('#file_upload').uploadify("upload",'*')。
					buttonClass : '',           // 按钮样式
					buttonCursor : 'hand',      //鼠标指针悬停在按钮上的样子
					buttonImage : null,          //浏览按钮的图片的路径 。
					buttonText : 'SELECT FILES', // 浏览按钮的文本。
					checkExisting : false,      // 文件上传重复性检查程序，检查即将上传的文件在服务器端是否已存在，存在返回1，不存在返回0
					debug : false,              // 如果设置为true则表示启用SWFUpload的调试模式
					fileObjName : 'Filedata',   // 文件上传对象的名称，如果命名为’the_files’，PHP程序可以用$_FILES['the_files']来处理上传的文件对象。
					fileSizeLimit : '5MB',      // 上传文件的大小限制 ，如果为整数型则表示以KB为单位的大小，如果是字符串，则可以使用(B, KB, MB, or GB)为单位，比如’2MB’,如果设置为0则表示无限制
					fileTypeDesc : 'All Files', // 这个属性值必须设置fileTypeExts属性后才有效，用来设置选择文件对话框中的提示文本，如设置fileTypeDesc为“请选择rar doc pdf文件”
					fileTypeExts : '*.*',       // 设置可以选择的文件的类型，格式如：’*.doc;*.pdf;*.rar’ 。
					formData : {},              // JSON格式上传每个文件的同时提交到服务器的额外数据，可在’onUploadStart’事件中使用’settings’方法动态设置。
					height : 30,                // 设置浏览按钮的高度 ，默认值
					itemTemplate : false,     // 用于设置上传队列的HTML模版，可以使用以下标签：
												//instanceID – Uploadify实例的ID
												//fileID – 列队中此文件的ID,或者理解为此任务的ID
												//fileName – 文件的名称
												//fileSize – 当前上传文件的大小
												//插入模版标签时使用格式如：${fileName}
					method : 'Post',           // 提交方式Post或Get
					multi : true,             // 设置为true时可以上传多个文件。
					overrideEvents : {},     // 设置哪些事件可以被重写，JSON格式，如：’overrideEvents’ : ['onUploadProgress']
					preventCaching : true,  // 如果为true，则每次上传文件时自动加上一串随机字符串参数，防止URL缓存影响上传结果
					progressData : 'percentage',    // 设置上传进度显示方式，percentage显示上传百分比，speed显示上传速度
					queueID : false,                // 设置上传队列容器DOM元素的ID，如果为false则自动生成一个队列容器。
					queueSizeLimit : 999,           // 队列最多显示的任务数量，如果选择的文件数量超出此限制，将会出发onSelectError事件。注意此项并非最大文件上传数量，如果要限制最大上传文件数量，应设置uploadLimit。
					removeCompleted : true,         // 是否自动将已完成任务从队列中删除，如果设置为false则会一直保留此任务显示。
					removeTimeout : 3,              // 如果设置了任务完成后自动从队列中移除，则可以规定从完成到被移除的时间间隔。
					requeueErrors : false,          // 如果设置为true，则单个任务上传失败后将返回错误，并重新加入任务队列上传。
					successTimeout : 30,            // 文件上传成功后服务端应返回成功标志，此项设置返回结果的超时时间
					swf : 'uploadify.swf',            // uploadify.swf 文件的相对路径。
					uploader : 'uploadify.php',      // 后台处理程序的相对路径。
					uploadLimit : 999,              // 最大上传文件数量，如果达到或超出此限制将会触发onUploadError事件。
					width : 120,                     // 设置文件浏览按钮的宽度。

					onCancel : function(file){

					},// 当点击文件队列中文件的关闭按钮或点击取消上传时触发，file参数为被取消上传的文件对象
					onClearQueue : function(queueItemCount){

					},// 当调用函数cancel方法时触发，queueItemCount参数为被取消上传的文件数量。
					onDestroy : function(){

					},// 当destory方法被调用时触发
					onDialogClose : function(queueData){

					},// 当文件浏览框关闭时触发，如果将此事件被重写，则当向队列添加文件上传出错时不会弹出错误消息提示。queueData对象包含如下属性：
						//filesSelected 文件选择对话框中共选择了多少个文件
						//filesQueued 已经向队列中添加了多少个文件
						//filesReplaced 已经向队列中替换了多少个文件
						//filesCancelled 取消了多少个文件 filesErrored 出错了多少个文件
					onDialogOpen : function(){

					},// 当文件选择对话框弹出时立即出发，但可能在文件选择对话框被关闭之前并不能全部执行。
					onDisable : function(){

					},// 当disable方法禁用Uploadify上传按钮时被调用时触发。
					onEnable : function(){

					},// 当disable方法启用Uploadify上传按钮时被调用时触发。
					onFallback : function(){

					},// 当Uploadify初始化过程中检测到当前浏览器不支持flash时触发。
					onInit : function(){

					},// 首次初始化Uploadify结束时触发。
					onQueueComplete : function(queueData){

					},// 文件上传队列处理完毕后触发。queueData对象包含如下属性：
						//uploadsSuccessful – 上传成功的文件数量
						//uploadsErrored – 上传失败的文件数量
					onSelect : function(file){

					},// 选择文件后向队列中添加每个上传任务时都会触发。
					onSelectError : function(file, errorCode, errorMsg){

					},// 选择文件后向队列中添加每个上传任务时如果失败都会触发。
						// file – 文件对象
						//errorCode – 错误代码如下：
							//QUEUE_LIMIT_EXCEEDED – 任务数量超出队列限制；
							//FILE_EXCEEDS_SIZE_LIMIT – 文件大小超出限制；
							//ZERO_BYTE_FILE – 文件大小为0
							//INVALID_FILETYPE – 文件类型不符合要求
						//errorMsg – 错误提示，可通过’this.queueData.errorMsg’定制
					onSWFReady : function(){

					},// Flash文件载入成功后触发。
					onUploadComplete : function(file){

					},// 每个文件上传完毕后无论成功与否都会触发。
					onUploadError : function(file, errorCode, errorMsg, errorString){

					},// 文件上传出错时触发，参数由服务端程序返回。
					onUploadProgress : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal){

					},// 处理上传队列的过程中会多次触发此事件，每当任务状态有更新时都会触发。
						//file – 文件对象
						//bytesUploaded – 已上传的字节数
						//bytesTotal – 文件总字节数
						//totalBytesUploaded – 当前任务队列中全部文件已上传的总字节数
						//totalBytesTotal – 当前任务队列中全部文件的总字节数
					onUploadStart : function(file){

					},// 当文件即将开始上传时立即触发
					onUploadSuccess : function(file, data, response){

					}// 当文件上传成功时触发
						//file – 文件对象
						//data – 服务端输出返回的信息
						//response – 有输出时为true,如果无响应为false，如果返回的是false,当超过successTimeout设置的时间后假定为true

					//方法：$(elem).uploadify('upload',*);  $(elem).uploadify('stop');
						// cancel(fileID, suppressEvent)
								// 取消队列中的任务，不管此任务是否已经开始上传
								//fileID – 要取消的文件ID，如果为空则取消队列中第一个任务，如果为’*'则取消所有任务
								//suppressEvent – 是否阻止触发onUploadCancel事件，当清空队列时非常实用。
						//destroy()
								// 销毁Uploadify实例并将文件上传按钮恢复到原始状态
						//disable(setDisabled)
								// 禁用或启用文件浏览按钮
								// setDisabled – 设置为true表示禁用，false为启用
						//settings(name, value, resetObjects)
								// 获取或设置Uploadify实例参数
								// name – 属性名称，如果只提供属性名称则表示获取其值
								// value – 属性值
								// resetObjects – 设置为true时，更新postData对象将清空现有的值。否则，新的值将被添加到其末尾。
						//stop()
								// 停止当前正在上传的任务
						//upload(fileID)
								// 立即上传指定的文件，如果fileID为’*'表示上传所有文件，要指定上传多个文件，则将每个文件的fileID作为一个参数
				});
			},10);
		});
	</script>
</body>
</html>