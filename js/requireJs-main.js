
//目前没有卵用，以后再研究为什么 该配置只对本文件内的生效了
require.config(
    {
        paths: {
            //"jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", "js/jquery-1.9.0.min"],
            "jquery": "jquery-1.9.0.min",
            "testEcharts": "testEcharts"
        }
    }
);

//以相对于本页面路径为基准
//(["js/testEcharts"], function () { alert("testjs加载完了");});
require(["jquery", "testEcharts"], function ($) {
    //alert("加载complete");
    //alert($().jquery);
});