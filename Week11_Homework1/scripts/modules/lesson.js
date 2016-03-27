/**
 * Created by bounlusin on 2016/1/22.
 */
/*课程点击*/
define(function (require){
    require("jQuery");
    $lessonIndex = $(".lesson-index");
    $lessonLeft = $("#lesson-left");
    $lessonRight = $("#lesson-right");
    $lessonWrap = $(".lesson-wrap");

    /*左右按键隐藏和显示*/
    $lessonIndex.mouseenter(function(){
        $lessonLeft.css("display","block");
        $lessonRight.css("display","block");
    }).mouseleave(function(){
        $lessonLeft.css("display","none");
        $lessonRight.css("display","none");
    });

    /*点击向左滑动*/
    $lessonLeft.click(function(){
        $lessonWrap.prepend($(".lesson-wrap .lesson-item").last());
        $lessonWrap.css("margin-left",0-$(".lesson-item").width());
        $lessonWrap.animate({
            "margin-left": 0
        }, 300);
    });

    /*点击向右滑动*/
    $lessonRight.click(function(){
        $lessonWrap.animate({
            "margin-left": 0 - $(".lesson-item").width()
        }, 300, function(){
            $lessonWrap.append($(".lesson-wrap .lesson-item").first());
            $lessonWrap.css("margin-left","0");
        });
    });
});