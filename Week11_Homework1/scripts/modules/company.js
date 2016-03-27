/**
 * Created by bounlusin on 2016/1/22.
 */
/*企业点击*/
define(function(require){
    require("jQuery");
    $companyBox = $(".company-box");
    $companyLeft = $("#company-left");
    $companyRight = $("#company-right");
    $companyWrap = $(".company-wrap");

    /*左右按键隐藏和显示*/
    $companyBox.mouseenter(function(){
        $companyLeft.css("display","block");
        $companyRight.css("display","block");
    }).mouseleave(function(){
        $companyLeft.css("display","none");
        $companyRight.css("display","none");
    });

    /*点击向左滑动*/
    $companyLeft.click(function(){
        $companyWrap.prepend($(".company-wrap .company-item").last());
        $companyWrap.css("margin-left",0-$(".company-item").width());
        $companyWrap.animate({
            "margin-left": 0
        }, 300);
    });

    /*点击向右滑动*/
    $companyRight.click(function(){
        $companyWrap.animate({
            "margin-left": 0 - $(".company-item").width()
        }, 300, function(){
            $companyWrap.append($(".company-wrap .company-item").first());
            $companyWrap.css("margin-left","0");
        });
    });

});
