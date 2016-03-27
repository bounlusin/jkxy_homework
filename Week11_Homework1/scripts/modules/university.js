/**
 * Created by bounlusin on 2016/1/22.
 */

/*大学点击*/
define(function(require){
    require("jQuery");
    $universityBox = $(".university-box");
    $universityLeft = $("#university-left");
    $universityRight = $("#university-right");
    $universityWrap = $(".university-wrap");

    /*左右按键隐藏和显示*/
    $universityBox.mouseenter(function(){
        $universityLeft.css("display","block");
        $universityRight.css("display","block");
    }).mouseleave(function(){
        $universityLeft.css("display","none");
        $universityRight.css("display","none");
    });

    /*点击向左滑动*/
    $universityLeft.click(function(){
        $universityWrap.prepend($(".university-wrap .university-item").last());
        $universityWrap.css("margin-left",0-$(".university-item").width());
        $universityWrap.animate({
            "margin-left": 0
        }, 300);
    });

    /*点击向右滑动*/
    $universityRight.click(function(){
        $universityWrap.animate({
            "margin-left": 0 - $(".university-item").width()
        }, 300, function(){
            $universityWrap.append($(".university-wrap .university-item").first());
            $universityWrap.css("margin-left","0");
        });
    });

});