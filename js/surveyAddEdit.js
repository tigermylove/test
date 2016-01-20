/// <reference path="jquery-1.9.0.min.js" />
function initialQuestionChooser() {
    //点击问题库中题目添加问题
    $("div.survey-question-list").on("click", "ul>li>ul>li>h4", function () {
        //紧随其后的内容div
        console.log($(this).siblings(".one-question").clone(true));
        //半透明显示出
        $(this).siblings(".one-question").css({ "display": "block", "opacity": "0.5", "filter": "alpha(opactity=50)" });
        //动画效果，移动，隐藏返回 offset没有动画效果
        $(this).siblings(".one-question").animate({ "left": "-750px", "bottom": "-300px" }, function () {
            //隐藏这个题目，也就是题目始终在题库有 只是隐藏和显示了
            $(this).siblings("h4").fadeOut();
            $(this).css({ "display": "none", "left": "0px", "bottom": "0px" });
            //在问卷中新增，这时候完全克隆的是隐藏状态
            $("div.survey-question-wrapper div.have-question").append($(this).clone());
            //display: none; opacity: 0.5; left: 0px; bottom: 0px;
            $("div.survey-question-wrapper div.have-question div.one-question").last().css({ "opacity": "1", "filter": "alpha(opactity=100)" });
            //添加后的序号问题
            $("div.survey-question-wrapper div.have-question div.one-question").last().find("h5>span.question-no").html("Q" + ($("div.survey-question-wrapper div.have-question div.one-question").last().index() + 1));
            $("div.survey-question-wrapper div.have-question div.one-question").last().slideDown();
        });
    });
    //鼠标经过显示操作栏效果
    $("div.survey-question-wrapper").on("mouseenter", "div.one-question", function () {
        $(this).find("div.question-optionbar").fadeIn();
    });
    //鼠标离开隐藏操作栏效果
    $("div.survey-question-wrapper").on("mouseleave", "div.one-question", function () {
        $(this).find("div.question-optionbar").fadeOut();
    });
    //删除问卷中题目
    $("div.survey-question-wrapper").on("click", "div.one-question div.question-optionbar>span.icon-moveOut", function () {
        //根据data-id找到问题库中的div.one-question
        var source = $("div.survey-question-list div.one-question[data-id=" + $(this).parents("div.one-question").attr("data-id") + "]");
        //设置初始样式
        source.attr({ "style": "" });
        source.css({ "display": "block", "opacity": "0.5", "filter": "alpha(opactity=50)", "left": "-750px", "bottom": "-" + ($(this).parents("div.one-question").offset().top - $(this).parents("div.one-question").height()) + "px" });
        source.animate({ "left": "0px", "bottom": "0px" }, function () {
            //在问卷中删除
            //序号重设
            //隐藏source
            //在题库中显示题目
            //展开？
        });
    });
}
//重设页面所有的序号 删除等等用，移动顺序可以只是交换不用这个
function resetQNo() {
    $("div.survey-question-wrapper div.have-question div.one-question").each(function () {
        $(this).find("h5>span.question-no").html("Q" + ($(this).index() + 1));
    });
}