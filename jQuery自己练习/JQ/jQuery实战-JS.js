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

    var arr = $(function() {
        var temp = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 6; j++) {
                $("<div></div>").css({
                    "width": 133.33,
                    "height": 133.33,
                    "background": "url(images/6.jpg) " + j * -133.33 + "px " + i * -133.33 + "px ",
                    "position": "absolute",
                    "left": j * 133.33,
                    "top": i * 133.33
                }).appendTo($maoni);
            }
        }
    })




});