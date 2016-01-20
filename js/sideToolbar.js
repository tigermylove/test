/// <reference path="jquery-1.9.0.min.js" />
var sidetoolbar_array=new Array();
function initial_sidetoolbar() {
    alert("hello");
    $("h2[id^='catalog_']").each(function () {
        $("div.catalog>dl").append('<dt><a onclick="javascript:scrollToAnchor(\'' + $(this).attr("id") + '\');"><span>●</span>' + $(this).html() + '</a></dt>');
        sidetoolbar_array.push(Math.floor($("#" + $(this).attr("id") + "").offset().top));
    });
    $(window).on("scroll", function () {
        alert($(window).scrollTop());
        //二分法
        //与中间值进行比较
        var pointer = binarySearch(sidetoolbar_array, $(window).scrollTop());
        $("div.sideToolbar div.catalog dl a > span").removeClass("nowAt").eq(pointer).addClass("nowAt");
    });
}

function scrollToAnchor(id){
    $("body").animate({ "scrollTop": $("#"+id+"").offset().top });
}
//二分法 逼近区间
function binarySearch(array, value) {
    var left = 0;
    var right = array.length;
    var middle;
    var position;
    //读array时候防止溢出！！！
    if (value <= array[0]) {
        position = 0;
        return position;
    }
    if (value > array[array.length - 1]) {
        position = array.length - 1;
        return position;
    }
    while (left <= right) {
        middle = Math.floor((left + right) / 2);
        if (array[middle] == value) {
            position = middle;
            break;
        }
        else if (array[middle] > value)
            right = middle - 1;
        else if (array[middle] < value)
            left = middle + 1;
    }
    //循环完了，但是不是边界点所以找不到，选最逼近区间的上[
    if (position == null || position == "") {
        position = left;
        position = position - 1;
    }
    return position;
}