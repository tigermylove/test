/// <reference path="jquery-1.9.0.min.js" />
//初始化遮罩层只用一次
function initialMaskLayer() {
    //$("div.mask-wrapper").height($(document).height());
}
//打开遮罩层每次必调用
function openMaskLayer() {
    //拒绝页面滚动
    //$(window).scrollTop(0);
    $("body").css({ "overflow": "hidden" });

    //下面这个不要在函数里用，方便重用
    //$("div.mask-wrapper").fadeIn();
}
//打开iframe遮罩层调用，伪iframe，是将请求页面内容放入该页面的容器里，最好只用于简单的显示
function openIframeMaskLayer(url) {
    openMaskLayer();
    $("div.mask-wrapper div.close").show();
    $("div.mask-wrapper div.option-bar").show();
    $("div.mask-wrapper div.close").on("click", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
    });
    $("div.mask-wrapper").css({ "overflow-y": "auto", "top": $(window).scrollTop() });


    //用ajax获取内容
    $.ajax({
        url: url,
        data: {

        },
        type: "GET",
        success: function (data) {
            //alert(data);
            $("div.mask-wrapper div.content div.iframe-content").html(data);

            $("div.mask-wrapper div.content").width("70%");
            $("div.mask-wrapper div.content").css({ "right": ($(window).width() - $("div.mask-wrapper div.content").width()) / 2 });
            $("div.mask-wrapper div.mask").height(($("div.mask-wrapper div.content").height() + 140) > $(window).height() ? ($("div.mask-wrapper div.content").height() + 140) : $(window).height());
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("啊哦，请求页面失败了~");
        }
    });

    $("div.mask-wrapper").fadeIn();
}

//只是打开普通的页内内容遮罩层，内容要转成字符串，样式自己写好
function openInsidePageMaskLayer(title, htmlstr) {
    openMaskLayer();
    $("div.mask-wrapper div.close").hide();
    $("div.mask-wrapper div.option-bar").hide();
    $("div.mask-wrapper").on("click", "div.normal-popup>h2", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
    });
    $("div.mask-wrapper").css({ "overflow-y": "auto", "top": $(window).scrollTop() });

    var allhtml = '<div class="normal-popup">\
                       <h2>'+ title + '<span class="icon-sprite icon-blueCross"></span></h2>\
                       <div class="normal-popup-content">'
                       + htmlstr +
                       '</div>\
                   </div>';
    $("div.mask-wrapper div.content div.iframe-content").html(allhtml);
    $("div.mask-wrapper div.content").width($("div.mask-wrapper div.content div.iframe-content div.normal-popup").width());
    console.log($(window).width() + "@@@" + $("div.mask-wrapper div.content").width());
    $("div.mask-wrapper div.content").css({ "right": ($(window).width() - $("div.mask-wrapper div.content").width()) / 2 });
    $("div.mask-wrapper div.mask").height(($("div.mask-wrapper div.content").height() + 140) > $(window).height() ? ($("div.mask-wrapper div.content").height() + 140) : $(window).height());

    $("div.mask-wrapper").fadeIn();
}
//自定义alert
function openAlertMaskLayer(messagestr) {
    $("div.mask-wrapper").on("click", "div.normal-popup-alert a.alert-confirm", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
    });

    var allhtml = '<div class="normal-popup-alert">\
                        <p>'+ messagestr + '</p>\
                        <a class="normal-btn deepgreen-btn alert-confirm">确认</a>\
                    </div>';
    openInsidePageMaskLayer("提示", allhtml);
}
//自定义confirm
function openConfirmMaskLayer(messagestr, confirmFunction, cancelFunction) {
    $("div.mask-wrapper").off("click", "div.normal-popup-alert a.alert-confirm");
    $("div.mask-wrapper").on("click", "div.normal-popup-alert a.alert-confirm", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
        if ((confirmFunction != null || confirmFunction != undefined)&&typeof(confirmFunction)=="function")
            confirmFunction();
    });
    $("div.mask-wrapper").off("click", "div.normal-popup-alert a.alert-cancel");
    $("div.mask-wrapper").on("click", "div.normal-popup-alert a.alert-cancel", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
        if ((cancelFunction != null || cancelFunction != undefined) && typeof cancelFunction == "function")
            //这样也可以……
            cancelFunction();
    });

    var allhtml = '<div class="normal-popup-alert">\
                        <p>'+ messagestr + '</p>\
                        <a class="normal-btn deepgreen-btn alert-confirm">确认</a>\
                        <a class="normal-btn deepgreen-btn alert-cancel">取消</a>\
                    </div>';
    openInsidePageMaskLayer("提示", allhtml);
}
//自定义prompt	
function openPromptMaskLayer(messagestr, givevalueFunction) {
    $("div.mask-wrapper").off("click", "div.normal-popup-alert a.alert-confirm");
    $("div.mask-wrapper").on("click", "div.normal-popup-alert a.alert-confirm", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
        if ((givevalueFunction != null || givevalueFunction != undefined) && typeof (givevalueFunction) == "function") {
            var value = $(this).siblings("input[type=text].prompt-textbox").val();
            givevalueFunction(value);
        }
    });
    $("div.mask-wrapper").off("click", "div.normal-popup-alert a.alert-cancel");
    $("div.mask-wrapper").on("click", "div.normal-popup-alert a.alert-cancel", function () {
        $("div.mask-wrapper").scrollTop(0);
        $("div.mask-wrapper").fadeOut();
        $("body").css({ "overflow": "scroll" });
    });

    var allhtml = '<div class="normal-popup-alert">\
                        <input type="text" placeholder="'+messagestr+'" class="prompt-textbox" id="prompt-textbox"/>\
                        <a class="normal-btn deepgreen-btn alert-confirm">确认</a>\
                        <a class="normal-btn deepgreen-btn alert-cancel">取消</a>\
                    </div>';
    openInsidePageMaskLayer("提示", allhtml);
}
//**************************************************************************************************************
//信息提示框
function showTips(message, left, top) {
    $("div.tips-information-wrapper div.tips-information-content")
        .html(message);
    $("div.tips-information-wrapper")
        .css({ "left": left, "top": top })
        .fadeIn();
}
//信息提示框隐藏
function hideTips() {
    $("div.tips-information-wrapper")
        .fadeOut();
}
//**************************************************************************************************
function initialBanner() {
    $("div.head-navi div.user-opt").css({ "right": $("div.head-navi div.banner-navi").outerWidth(true) + 10 });
    $("div.head-navi div.user-opt").on("mouseenter", function () {
        if ($(this).children("ul").is(":hidden")) {
            $(this).find("p span.icon-sprite").removeClass("icon-bluearrowdown").addClass("icon-bluearrowup");
            $(this).children("ul").slideDown();
        }
    });
    $("div.head-navi div.user-opt").on("mouseleave", function () {
        $(this).find("p span.icon-sprite").removeClass("icon-bluearrowup").addClass("icon-bluearrowdown");
        $(this).children("ul").slideUp();
    });
}

function initialMyDropDown() {
    $("div.mydropdown-wrapper").off("click", ".dropdown-label");
    $("div.mydropdown-wrapper").on("click", ".dropdown-label", function () {
        if ($(this).siblings("div.dropdown-pannel").is(":hidden")) {
            //点击下拉，当前下拉框隐藏时，隐藏其他所有下拉框，只显示当前的
            $("div.mydropdown-wrapper div.dropdown-pannel").slideUp("fast");
            $("div.mydropdown-wrapper .dropdown-label span.icon-sprite").removeClass("icon-greenarrowup").addClass("icon-greenarrowdown");

            $(this).siblings("div.dropdown-pannel").slideDown("fast");
            $(this).find("span.icon-sprite").removeClass("icon-greenarrowdown").addClass("icon-greenarrowup");
        }
        else {
            $(this).siblings("div.dropdown-pannel").slideUp("fast");
            $(this).find("span.icon-sprite").removeClass("icon-greenarrowup").addClass("icon-greenarrowdown");
        }
    });
    $("div.mydropdown-wrapper").off("click", "div.dropdown-pannel ul.dropdown-list>li>a");
    $("div.mydropdown-wrapper").on("click", "div.dropdown-pannel ul.dropdown-list>li>a", function () {
        $(this).parents("div.dropdown-pannel").siblings(".dropdown-label").attr({ "data-value": $(this).attr("data-value") });
        $(this).parents("div.dropdown-pannel").siblings(".dropdown-label").find("span.choosetext").html($(this).html());
        $(this).parents("div.dropdown-pannel").siblings(".dropdown-label").find("span.icon-sprite").removeClass("icon-greenarrowup").addClass("icon-greenarrowdown");
        $(this).parents("div.dropdown-pannel").slideUp("fast");
    });
}

//自定义分页控件
function generatePager(data) {
    //*******************************分页控件begin**************************************************************
    var pageString = '<div>\
										<span class="rows">共'+ data.allCount + '条记录</span>\
										<a class="home-page" href="javascript:void(0);" onclick="ajax_getPage(0)">首页</a>';
    if (data.page >= 1) {
        pageString += '<a class="previous" href="javascript:void(0);" onclick="ajax_getPage(' + (data.page - 1) + ')">上一页</a>';
    }
    else {
        pageString += '<a class="previous disabled" href="javascript:void(0);")">上一页</a>';
    }
    //尽量保持原来的不变的策略
    //这个if的值是容许全选最大数，包含，可变，不要小于10
    if (data.allPage <= 10) {
        for (var i = 0; i < data.allPage; i++) {
            if (i == data.page) {
                pageString += '<span class="current" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</span>';
            }
            else {
                pageString += '<a class="num" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</a>';
            }
        }
    }
    else {
        for (var i = 0; i < data.allPage; i++) {
            //采用的是模仿淘宝分页的策略
            //1.data.page在[0,4]之间
            if (data.page >= 0 && data.page <= 4) {
                //[0,4]正常输出
                if (i < 5) {
                    if (i == data.page) {
                        pageString += '<span class="current" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</span>';
                    }
                    else {
                        pageString += '<a class="num" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</a>';
                    }
                }
                    //其余的只输出一个“...”然后终止循环
                else {
                    pageString += '<a class="num" href="javascript:void(0);" style="text-decoration:none;">...</a>';
                    break;
                }
            }
            //2.data.page在[5,data.allpage-5]之间，前面显示3个后面显示三个，其余...
            if (data.page >= 5 && data.page <= data.allPage - 5) {
                if (i == 0) {
                    pageString += '<a class="num" href="javascript:void(0);" style="text-decoration:none;">...</a>';
                }
                else if (i > 0 && i < data.page - 3) {
                    continue;
                }
                    //i在[data.page-3,data.page+3]之间
                else if (i >= data.page - 3 & i <= data.page + 3) {
                    if (i == data.page) {
                        pageString += '<span class="current" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</span>';
                    }
                    else {
                        pageString += '<a class="num" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</a>';
                    }
                }
                else if (i > data.page + 3) {
                    pageString += '<a class="num" href="javascript:void(0);" style="text-decoration:none;">...</a>';
                    break;
                }
            }
            //3.data.page在[data.allPage-4,data.allPage-1]之间
            if (data.page >= data.allPage - 4 && data.page <= data.allPage - 1) {
                if (i == 0) {
                    pageString += '<a class="num" href="javascript:void(0);" style="text-decoration:none;">...</a>';
                }
                else if (i > 0 && i < data.allPage - 4) {
                    continue;
                }
                else if (i >= data.allPage - 4 && i <= data.allPage - 1) {
                    if (i == data.page) {
                        pageString += '<span class="current" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</span>';
                    }
                    else {
                        pageString += '<a class="num" href="javascript:void(0);" onclick="ajax_getPage(' + i + ')">' + (i + 1) + '</a>';
                    }
                }
            }
        }
    }
    if (data.page != data.allPage - 1) {
        if (data.allPage > 1) {
            pageString += '<a class="next" href="javascript:void(0);" onclick="ajax_getPage(' + (data.page + 1) + ')">下一页</a>';
        }
            //总页数等于1仍然显示一个disabled的下一页图标
        else {
            pageString += '<a class="next disabled" href="javascript:void(0);" )">下一页</a>';
        }
    }
    else {
        pageString += '<a class="next disabled" href="javascript:void(0);" )">下一页</a>';
    }
    pageString += '<a class="end-page" href="javascript:void(0);" onclick="ajax_getPage(' + (data.allPage - 1) + ')">尾页</a>\
										<div class="input-copyist">\
											<input id="ad" title="请按Enter跳转" onkeydown="" type="text" value="' + (data.page + 1) + '">\
										</div>\
									</div>';
    //*******************************分页控件end****************************************************************
    $("div.page").html(pageString);
    $("#ad").off("keydown");
    $("#ad").on("keydown", function (e) {
        if (e && e.keyCode == 13) {
            if ($('#ad').val() - 1 < 0 || $('#ad').val() - 1 > data.allPage - 1)
                ;
            else
                ajax_getPage($('#ad').val() - 1);
        }
    });
}
