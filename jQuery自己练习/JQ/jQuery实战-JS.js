$(function() {
    //获取元素
    var $imgs = $("#imgs ul li");
    var $circles = $("#circles ol li");
    var $carousel = $("#carousel");
    //创建猫腻图容器
    var $maoni = $("<li class='maoni'><li>").appendTo($("#imgs ul"));
    //width/height =133.33; 


    //点击close  让对应的蒙版消失
    $(".close").click(function() {
            $(this).parent().fadeOut(1000);
        })
        //页面加载时，蒙版淡入
    $(".mask").eq(0).fadeOut(0).stop(true).fadeIn(1000);

    //定义一个数组，用于保存18张碎图片

    var arr = (function() {
        var temp = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 6; j++) {
                temp.push($("<div></div>").css({
                    "width": 0,
                    "height": 0,
                    "background": "url(images/6.jpg) " + j * -133.33 + "px " + i * -133.33 + "px ",
                    "position": "absolute",
                    "left": j * 133.33,
                    "top": i * 133.33
                }).appendTo($maoni));
            }
        }
        return temp;
    })();
    //定义两个信号量
    //按钮的信号量
    var small_idx = 0;
    //图片的信号量
    var big_idx = 0;
    //定义锁
    var lock = true;

    //定义一个定时器
    var timer = setInterval(function() {
        small_idx++;
        if (small_idx > $circles.length - 1) {
            small_idx = 0;
        }
        change.call($circles.eq(small_idx));
    }, 6000);

    //当鼠标进入carousel的时候停止定时器
    $carousel.mouseenter(function() {
        clearInterval(timer);
    })

    //当鼠标离开carousel的时候停止定时器
    $carousel.mouseleave(function() {
        clearInterval(timer);
        timer = setInterval(function() {
            small_idx++;
            if (small_idx > $circles.length - 1) {
                small_idx = 0;
            }
            change.call($circles.eq(small_idx));
        }, 6000);
    })

    //给按钮添加点击事件
    $circles.click(change);
    //定义一个函数
    function change() {
        if (!lock) {
            return;
        }
        //关闭锁
        lock = false;

        //改变按钮的信号量
        small_idx = $(this).index();
        //当按钮的值等于图片的值直接返回
        if (small_idx == big_idx) {
            lock = true;
            return;
        }
        //当前按钮加cur
        $($(this).children()[0]).addClass("cur");
        $($($(this).siblings()).children()).removeClass("cur");

        //原来大图的蒙版消失
        $(".mask").eq(big_idx).stop(true).fadeOut(1000);

        //猫腻图出现
        $maoni.addClass("active");

        //轮换猫腻图
        $.each(arr, function(index, value) {
                // console.log(value);
                value.css("backgroundImage", "url(images/" + (small_idx + 6) + ".jpg)").animate({
                    "width": 133.33,
                    "height": 133.33
                }, 300 + Math.random() * 2000);
            })
            //定义延时器，在所有碎图片完成之后要做的事
        setTimeout(function() {
            //当所有碎图显示之后，宽高要设为0
            //使用$.each遍历
            $.each(arr, function(index, value) {
                value.css({
                    "width": 0,
                    "height": 0
                })
            })

            //所有猫腻图显示之后，出现真图
            //改变大图的值
            big_idx = small_idx;
            //大图出现
            $imgs.eq(big_idx).addClass("active").siblings().removeClass("active");
            //d定义大图的蒙版淡入
            $(".mask").eq(big_idx).fadeOut(0).stop(true).fadeIn(1000);
            //所有完成之后  开锁
            lock = true;

        }, 2300)
    }
});