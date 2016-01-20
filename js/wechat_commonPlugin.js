/// <reference path="jquery-1.9.0.min.js" />
//闭包限定命名空间
(function ($) {
    $.fn.extend({
        "highLight": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function () {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
                //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
                //根据参数来设置 dom的样式
                $this.css({
                    backgroundColor: opts.background,
                    color: opts.foreground
                });
                //格式化高亮文本
                var markup = $this.html();
                markup = $.fn.highLight.format(markup);
                $this.html(markup);
            });
        },
        "maskShow": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, mask_defaluts, options); //使用jQuery.extend 覆盖插件默认参数

            return this.each(function () {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
                //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom

                switch (opts.type) {
                    case "fade":
                        $this.fadeIn();
                        break;
                    default:
                        $this.show();
                        break;
                }
            });
        },
        "maskHide": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, mask_defaluts, options); //使用jQuery.extend 覆盖插件默认参数

            return this.each(function () {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
                //遍历所有的要高亮的dom,当调用 highLight()插件的是一个集合的时候。
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom

                switch (opts.type) {
                    case "fade":
                        $this.fadeOut();
                        break;
                    default:
                        $this.hide();
                        break;
                }
            });
        }
    });
    $.extend({
        "selectlist_wxl": function (options) {
            //初始化 新生成 第一次调用
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, selectlist_defaluts, options); //使用jQuery.extend 覆盖插件默认参数

            //*************************************************************************************
            var html = '<div class="wechat-commonPlugin-mask" data-guid="'+(guid++)+'">\
                            <div class="wechat-commonPlugin-' + opts.type + '">\
                                <div class="wechat-commonPlugin-bottomSelectList-title">\
                                    '+opts.title+'\
                                </div>\
                                <input type="hidden" name="" id="wechat-commonPlugin-bottomSelectList-value" data-value="' + opts.checked_value + '" data-id="' + opts.checked_id + '" value="' + (opts.main_controller == "id" ? opts.checked_id : opts.checked_value) + '"/>\
                                <ul class="wechat-commonPlugin-bottomSelectList-select">';
            if(opts.main_controller=="id"){
                for(var i=0;i<opts.data_ids.length;i++){
                    if(opts.data_ids[i]==opts.checked_id){
                        html+='<li><a data-id="'+opts.data_ids[i]+'" data-value="'+opts.data_values[i]+'" class="acquiescent">'+opts.data_values[i]+'</a></li>';
                    }
                    else{
                        html+='<li><a data-id="'+opts.data_ids[i]+'" data-value="'+opts.data_values[i]+'">'+opts.data_values[i]+'</a></li>';
                    }
                }
            }
            else{
                for(var i=0;i<opts.data_values.length;i++){
                    if(opts.data_values[i]==opts.checked_value){
                        html+='<li><a data-id="'+opts.data_ids[i]+'" data-value="'+opts.data_values[i]+'" class="acquiescent">'+opts.data_values[i]+'</a></li>';
                    }
                    else{
                        html+='<li><a data-id="'+opts.data_ids[i]+'" data-value="'+opts.data_values[i]+'">'+opts.data_values[i]+'</a></li>';
                    }
                }
            }
                        html+='</ul>\
                                <div class="wechat-commonPlugin-splitBar"></div>\
                                <div class="wechat-commonPlugin-bottomSelectList-cancel">取消</div>\
                            </div>\
                        </div>';
            $("body").append(html);
            //*************************************************************************************
            $(":animated").stop(true, true);
            //显示遮罩
            $("div.wechat-commonPlugin-mask[data-guid=" + (guid - 1) + "]").maskShow();
            //原始高度
            var temp_height = $("div.wechat-commonPlugin-mask[data-guid=" + (guid - 1) + "]").find("div.wechat-commonPlugin-" + opts.type).height();
            //高度为0 显示 动画还原原来高度
            $("div.wechat-commonPlugin-mask[data-guid=" + (guid - 1) + "]").find("div.wechat-commonPlugin-" + opts.type).height(0)
                .show()
                .animate({ "height": temp_height }, 200);

            //*************************************************************************************
            $("div.wechat-commonPlugin-mask[data-guid=" + (guid - 1) + "]").find("ul.wechat-commonPlugin-bottomSelectList-select li a")
                .on("click", function (event) {
                    event.stopPropagation();

                    $(this).parents("div.wechat-commonPlugin-mask").find("ul.wechat-commonPlugin-bottomSelectList-select li a").removeClass("acquiescent");
                    $(this).parents("div.wechat-commonPlugin-mask").find("input#wechat-commonPlugin-bottomSelectList-value")
                        .val((opts.main_controller == "id" ? $(this).attr("data-id") : $(this).attr("data-value")))
                        .attr({ "data-id": $(this).attr("data-id"), "data-value": $(this).attr("data-value") });
                    $(this).addClass("acquiescent");

                    //逆向动画
                    var temp_height = $(this).parents("div.wechat-commonPlugin-mask").children().height();
                    $(":animated").stop(true, true);
                    $(this).parents("div.wechat-commonPlugin-mask").children()
                        .animate({ "height": 0 }, 200, function () {
                            $(this).parents("div.wechat-commonPlugin-mask").children()
                                .hide()
                                .height(temp_height);
                            //setTimeout(function () {
                            //    $(this).parents("div.wechat-commonPlugin-mask").maskHide({"type":"fade"});
                            //}, 200);
                            $(this).parents("div.wechat-commonPlugin-mask").maskHide({ "type": "fade" });
                        });
                });
            $("div.wechat-commonPlugin-mask[data-guid=" + (guid - 1) + "]").on("click", function () {
                $.selectlist_wxl.close($(this).attr("data-guid"));
            });
            //*************************************************************************************
            //返回当前下拉的guid备用
            return (guid - 1);
        },
        "alert_wxl": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, alert_defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            
            //*****************************************************************************
            //因为这个不需要重复利用所以一个页面共用一个
            //判断页面中是否有该节点
            //有
            if ($("div.wechat-commonPlugin-alert").length) {
                $("div.wechat-commonPlugin-alert").html(opts.alert_information);
            }
            else {
                var html = '<div class="wechat-commonPlugin-alert">\
                                '+ opts.alert_information + '\
                            </div>';
                $("body").append(html);
            }
            //*****************************************************************************
            //动画效果 如果初始设为隐藏那么就看不见了……
            //显示
            $("div.wechat-commonPlugin-alert").removeClass("animated bounceOut");
            $("div.wechat-commonPlugin-alert").addClass("animated bounceIn");
            //经过duration时间（毫秒）之后隐藏
            setTimeout(function () {
                $("div.wechat-commonPlugin-alert").removeClass("animated bounceIn");
                $("div.wechat-commonPlugin-alert").addClass("animated bounceOut");
            },opts.last_time);
            //*****************************************************************************
        },
        "confirm_wxl": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            var opts = $.extend({}, confirm_defaluts, options); //使用jQuery.extend 覆盖插件默认参数

            //*****************************************************************************
            //因为这个不需要重复利用所以一个页面共用一个
            if ($("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").length) {
                $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                    .find(".wechat-commonPlugin-confirmLike-content .wechat-commonPlugin-confirm-title")
                    .html(opts.confirm_title);
                $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                    .find(".wechat-commonPlugin-confirmLike-content .wechat-commonPlugin-confirm-detail")
                    .html(opts.confirm_detail);
                $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                    .find(".wechat-commonPlugin-confirmLike-options a.left-opt")
                    .html(opts.left_opt[0])
                    .css({ "color": opts.left_opt[1] });
                $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                    .find(".wechat-commonPlugin-confirmLike-options a.right-opt")
                    .html(opts.right_opt[0])
                    .css({ "color": opts.right_opt[1] });
            }
            else {
                var html = '<div class="wechat-commonPlugin-mask" data-guid="'+(guid++)+'">\
                                <div class="wechat-commonPlugin-confirmLike wechat-commonPlugin-confirm">\
                                    <div class="wechat-commonPlugin-confirmLike-content">\
                                        <div class="wechat-commonPlugin-confirm-title">' + opts.confirm_title + '</div>\
                                        <div class="wechat-commonPlugin-confirm-detail tips">\
                                            '+opts.confirm_detail+'\
                                        </div>\
                                    </div>\
                                    <div class="wechat-commonPlugin-confirmLike-options">\
                                        <a class="left-opt" style="color:' + opts.left_opt[1] + ';">' + opts.left_opt[0] + '</a>\
                                        <a class="right-opt" style="color:' + opts.right_opt[1] + ';">' + opts.right_opt[0] + '</a>\
                                    </div>\
                                </div>\
                            </div>';
                $("body").append(html);
            }
            //*****************************************************************************
            //debugger;
            //动画显现
            $(":animated").stop(true, true);
            //显示遮罩
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").parent().maskShow();

            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").removeClass("animated bounceOutDown");
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").addClass("animated bounceInDown");
            //*****************************************************************************
            //事件处理
            //因为每次调用都有不同的事件 但是却用的一个元素 所以先关闭事件再绑定事件（不同于selectlist根据唯一guid绑定）
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                .find(".wechat-commonPlugin-confirmLike-options a.left-opt")
                .off("click");
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                .find(".wechat-commonPlugin-confirmLike-options a.left-opt")
                .on("click", function () {
                    event.stopPropagation();
                    $.confirm_wxl.close();
                    //现在是关闭的同时执行函数，如果不行再考虑修改，只是执行，在这里有没有参数没有关系。
                    //其实可以使用callback机制 这个函数作为参数 放到上面的函数内部执行，但是这样就无法调用参数咯？
                    //所以暂时就接近于同时 如果阻断那么将阻断执行
                    opts.on_left(opts.left_opt[0]);
                });
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                .find(".wechat-commonPlugin-confirmLike-options a.right-opt")
                .off("click");
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm")
                .find(".wechat-commonPlugin-confirmLike-options a.right-opt")
                .on("click", function () {
                    event.stopPropagation();
                    $.confirm_wxl.close();
                    //现在是关闭的同时执行函数，如果不行再考虑修改
                    opts.on_right(opts.right_opt[0]);
                });
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").parent()
                .off("click");
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").parent()
                .on("click", function () {
                    $.confirm_wxl.close();
                });
            //*****************************************************************************
            return $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").parent().attr("data-guid");
        }
    });
    //默认参数
    var defaluts = {
        foreground: 'red',
        background: 'yellow'
    };
    //弹出框插件默认参数
    var popup_defaluts = {
        //string 类型目前有mobile_copyist
        type: 'mobile_copyist'
    };
    //selectlist插件默认参数
    var selectlist_defaluts = {
        //string 类型目前有bottom
        type: 'bottomSelectList',
        title: "你要选择",
        data_ids: [0, 1, 2, 3],
        data_values: ["because小黄人", "I", "am", "happy大眼萌"],
        checked_id: 3,
        checked_value: "happy大眼萌",
        //主要决定因素 value id
        main_controller:"value"
    };
    //alert插件默认参数
    var alert_defaluts = {
        //默认内容
        alert_information: "呜呜呜我的键盘君你还好么，这是默认alert内容请不要介意",
        last_time:3000
    };
    //confirm插件默认参数
    var confirm_defaluts = {
        //默认内容
        confirm_title: "周浩你确定你喜欢穆建云？",
        confirm_detail: "穆建云可是喜欢罗飞哟？穆建云可是喜欢罗飞哟？",
        left_opt: ["解除", "#ff4c62"],
        right_opt: ["取消", "#333333"],
        on_left: function (left_opt_value) {
            $.alert_wxl({ "alert_information": "你点击了左边"+left_opt_value+"" });
        },
        on_right: function (right_opt_value) {
            $.alert_wxl({ "alert_information": "你点击了右边"+right_opt_value+"" });
        }
    };
    //mask默认参数
    var mask_defaluts = {
        //string 类型目前有normal fade
        type: 'normal'
    };

    //用于识别不同
    var guid = 0;

    //公共的格式化 方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
    $.fn.highLight.format = function (str) {
        return "<strong>" + str + "</strong>";
    }

    //公有方法，显示显示过的下拉列表
    $.selectlist_wxl.open = function (guid) {
        $(":animated").stop(true, true);
        //显示遮罩
        $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").maskShow();
        //原始高度
        var temp_height = $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").children().height();
        //高度为0 显示 动画还原原来高度
        $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").children().height(0)
            .show()
            .animate({ "height": temp_height }, 200);
    };
    //公有方法，隐藏下拉列表
    $.selectlist_wxl.close = function (guid) {
        //逆向动画
        var temp_height = $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").children().height();
        $(":animated").stop(true, true);
        $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").children()
            .animate({ "height": 0 }, 200, function () {
                $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").children()
                    .hide()
                    .height(temp_height);
                //setTimeout(function () {
                //    $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").maskHide({"type":"fade"});
                //}, 200);
                $("div.wechat-commonPlugin-mask[data-guid=" + guid + "]").maskHide({ "type": "fade" });
            });
    };

    //公有方法，隐藏confirm
    $.confirm_wxl.close = function () {
        //debugger;
        //动画隐藏
        $(":animated").stop(true, true);

        $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").removeClass("animated bounceInDown");
        $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").addClass("animated bounceOutDown");
        setTimeout(function () {
            //遮罩
            $("div.wechat-commonPlugin-mask div.wechat-commonPlugin-confirmLike.wechat-commonPlugin-confirm").parent().maskHide({ "type": "fade" });
        }, 1000);
    };


    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
    //私有方法，生成guid，暂时不用耗费计算量
    function uuid() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        return uuid;
    }
})(window.jQuery);