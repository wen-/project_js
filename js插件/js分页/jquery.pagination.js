/**
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.1
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
jQuery.fn.pagination = function(maxentries, opts) {
    opts = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 10,
        current_page: 0,
        num_edge_entries: 0,
        link_to: "#",
        prev_text: "Prev",
        next_text: "Next",
        ellipse_text: "...",
		jump:true,
		jump_input_style:"pagjump_txt",
		jump_button_style:"pagjump_btn",
        prev_show_always: true,
        next_show_always: true,
        callback: function() { return false; }
    }, opts || {});

    return this.each(function() {
        /**
        * Calculate the maximum number of pages
        */
        function numPages() {
            return Math.ceil(maxentries / opts.items_per_page);
        }

        /**
        * Calculate start and end point of pagination links depending on 
        * current_page and num_display_entries.
        * @return {Array}
        */
        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end];
        }

        /**
        * This is the event handling function for the pagination links. 
        * @param {int} page_id The new page number
        */
        function pageSelected(page_id, evt) {
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }

        /**
        * This function inserts the pagination links into the container element
        */
        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            // This helper function returns a handler function that calls pageSelected with the right page_id
            var getClickHandler = function(page_id) {
                return function(evt) { return pageSelected(page_id, evt); }
            }
            // Helper function for generating a single link (or a span tag if it'S the current page)
            var appendItem = function(page_id, appendopts) {
                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1); // Normalize page id to sane value
                appendopts = jQuery.extend({ text: page_id + 1, classes: "" }, appendopts || {});
                if (page_id == current_page) {
                    var lnk = $("<span class='this_p'>" + (appendopts.text) + "</span>");
                }
                else {
                    var lnk = $("<a>" + (appendopts.text) + "</a>")
						.bind("click", getClickHandler(page_id))
						.attr('href', opts.link_to.replace(/__id__/, page_id));


                }
                if (appendopts.classes) { lnk.removeAttr('class'); lnk.addClass(appendopts.classes); }
                panel.append(lnk);
            }
            // Generate "Previous"-Link
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendItem(current_page - 1, { text: opts.prev_text, classes: "disabled" });
            }
            // Generate starting points
            if (interval[0] > 0 && opts.num_edge_entries > 0) {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for (var i = 0; i < end; i++) {
                    appendItem(i);
                }
                if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                    jQuery("<span class='ellipse'>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
            }
            // Generate interval links
            for (var i = interval[0]; i < interval[1]; i++) {
                appendItem(i);
            }
            // Generate ending points
            if (interval[1] < np && opts.num_edge_entries > 0) {
                if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                    jQuery("<span class='ellipse'>" + opts.ellipse_text + "</span>").appendTo(panel);
                }
                var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                for (var i = begin; i < np; i++) {
                    appendItem(i);
                }

            }
            // Generate "Next"-Link
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                appendItem(current_page + 1, { text: opts.next_text, classes: "disabled" });
            }
			//新增跳页20130613
			if(opts.jump){
				jQuery("<span class='pagjump_box'>跳到<input class='"+opts.jump_input_style+"' type='text' /><button type='button' class='"+opts.jump_button_style+"'>确定</button>").appendTo(panel).delegate("button","click",function(e){
					var page_id = jQuery(this).prev(".pagjump_txt").val();
					if(page_id == ""){
						return false;
					}else if(page_id > np || page_id < 0){
						alert("超出页码范围！");
						return false;
					};
					pageSelected(page_id-1,e);
				});
			};
        }

        // Extract current_page from options
        var current_page = opts.current_page;
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        // Store DOM element for easy access from all inner functions
        var panel = jQuery(this);
        // Attach control functions to the DOM element 
        this.selectPage = function(page_id) { pageSelected(page_id); }
        this.prevPage = function() {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function() {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true;
            }
            else {
                return false;
            }
        }
        // When all initialisation is done, draw the links
        drawLinks();
    });
}

/*====
 <div class="page_num">
     <!--
         <a href="#">上一页</a>
         <a href="#" class="this_p">1</a>
         <a href="#">2</a>
         <a href="#">3</a>
         <a href="#">4</a>
         <a href="#">5</a>
         <span class="ellipsis">..</span>
         <a href="#">12</a>
         <a href="#">下一页</a>
     -->
 </div>
 <script type="text/javascript">
     $(function(){
         $(".page_num").pagination(150,{    //总记录数
             items_per_page: 10,            //每页显示数
             num_display_entries: 3,        //中间连续显示的页数
             current_page: 0,               //当前页
             num_edge_entries: 1,           //两边预留页数
             link_to: "#",                  //页码链接
             prev_text: "",                 //上一页文字
             next_text: "下一页",            //下一页文字
             ellipse_text: "...",           //省略页替代内容
             prev_show_always: true,        //上一页是否一直显示
             next_show_always: true,        //下一页是否一直显示
             callback: function(page_id,panel) {
                             $.ajax({
                                 type: "POST",
                                 url: "json/复件 "+name+"_"+page_id+".json",
                                 dataType: "json",
                                 beforeSend:function(){
                                     $("div.loading").remove();
                                     $('<div class="loading"></div>').appendTo(a.parents(".popup_app_list").find(".app_devloper_box_m")).css({"position":"absolute","height":"100%","width":"100%","z-index":"100","background-image":"url(images/loading.gif)","background-position":"center","background-color":"rgba(0,0,0,0.2)","background-repeat":"no-repeat","left":"0","top":"0"})
                                     oldtime = +new Date();
                                     a.parents(".popup_app_list").find("table.d_applist tbody").remove();
                                 },
                                 error: function(){
                                     console.log("请求失败!");
                                     $("div.loading").css({"background-image":"none"}).append("<span>数据加载失败！</span>");
                                     $("div.loading span").css({"padding":"120px 0 0 300px","position":"absolute","color":"#fff"});
                                     setTimeout(function(){$("div.loading").remove();},2000);
                                     return false;
                                 },
                                 success: function(json){
                                     newtime = +new Date();
                                     loadtime = newtime-oldtime<1000?2000:newtime-oldtime;
                                     setTimeout(function(){
                                         a.parents(".popup_app_list").find("table.d_applist tbody").remove();
                                         var devloper_name = a.parents(".popup_app_list").find(".popup_app_dt h3").html();
                                         var tr = "";
                                         $.each(json,function(index,elm){
                                             tr += "<tr>\
                                             <td width=\"250\">"+json[index].appname+"</td>\
                                             <td width=\"100\">"+json[index].appsort+"</td>\
                                             <td width=\"130\">"+json[index].appdowns+"</td>\
                                             <td width=\"120\"><span class=\"star_m\"><span class=\"star_m star_m1\" style=\"width:"+json[index].appstar+"%\"></span></span></td>\
                                             <td><a href=\"#\" class=\"app_devloper_down\">下载</a></td>\
                                             </tr>";
                                         })
                                         $("<tbody></tbody>").html(tr).appendTo(a.parents(".popup_app_list").find("table.d_applist"));
                                         $("div.loading").remove();
                                     },loadtime);
                                 }
                             });
              }//点击页码执行回调，可在此处AJAX当前页内容
     });
 </script>
====*/

