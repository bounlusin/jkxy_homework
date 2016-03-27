/**
 * Created by bounlusin on 2016/1/22.
 */

/*媒体点击滑动*/
define(function (require){
    require("jQuery");
    $mediaBox = $(".media-box");
    $mediaLeft = $("#media-left");
    $mediaRight = $("#media-right");
    $mediaWrap = $(".media-wrap");

    /*左右按键隐藏和显示*/
    $mediaBox.mouseenter(function(){
        $mediaLeft.css("display","block");
        $mediaRight.css("display","block");
    }).mouseleave(function(){
        $mediaLeft.css("display","none");
        $mediaRight.css("display","none");
    });

    /*点击向左滑动*/
    $mediaLeft.click(function(){
        $mediaWrap.prepend($(".media-wrap .media-item").last());
        $mediaWrap.css("margin-left",0-$(".media-item").width());
        $mediaWrap.animate({
            "margin-left": 0
        }, 300);
    });

    /*点击向右滑动*/
    $mediaRight.click(function(){
        $mediaWrap.animate({
            "margin-left": 0 - $(".media-item").width()
        }, 300, function(){
            $mediaWrap.append($(".media-wrap .media-item").first());
            $mediaWrap.css("margin-left","0");
        });
    });

});