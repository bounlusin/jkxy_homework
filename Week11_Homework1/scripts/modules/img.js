/**
 * Created by bounlusin on 2016/1/22.
 */

/*图片轮播、点击*/
define(function (require){
    require("jQuery");

    var timeInterval;
    $indexBanner = $(".index-banner");
    $imgIndexs = $(".img-index");
    $itemWrap = $(".item-wrap");
    $subItem = $(".item-wrap .sub-item");
    $bannerLeft = $("#banner-left");
    $bannerRight = $("#banner-right");

    /*左右按键隐藏显示*/
    $indexBanner.mouseenter(function(){
        $bannerLeft.css("display", "block");
        $bannerRight.css("display", "block");
        cancerAutoTurnRight();
    }).mouseleave(function(){
        $bannerLeft.css("display", "none");
        $bannerRight.css("display", "none");
        autoTurnRight();
    });

    /*点击向左滑动*/
    $bannerLeft.click(function(){
        $itemWrap.prepend($(".item-wrap .sub-item").last());
        $itemWrap.css("margin-left",0-$(".sub-item").width());
        $itemWrap.animate({
            "margin-left": 0
        }, 700);

        var currentIndex = $(".item-wrap .sub-item").last().attr("data-index");
        $imgIndexs.each(function(){
            $this = $(this);
            if($this.attr("data-index") == ((currentIndex-0)%7+1)){
                $this.addClass("active");
            }else{
                $this.removeClass("active");
            }
        });
    });

    /*点击向右滑动*/
    $bannerRight.click(function(){
        $itemWrap.animate({
            "margin-left": 0 - $(".sub-item").width()
        }, 700, function(){
            $itemWrap.append($(".item-wrap .sub-item").first());
            $itemWrap.css("margin-left","0");
        });

        var currentIndex = $(".item-wrap .sub-item").first().attr("data-index");
        $imgIndexs.each(function(){
            $this = $(this);
            if($this.attr("data-index") == ((currentIndex-0)%7+1)){
                $this.addClass("active");
            }else{
                $this.removeClass("active");
            }
        });
    });

    /*下方点击切换图片*/
    $imgIndexs.each(function(){
        $this = $(this);
        $this.on("click", function(){
            $itemWrap = $(".item-wrap");
            $imgItems = $(".item-wrap .sub-item");
            $imgIndexs = $(".img-index");

            $$this = $(this);
            var index = $$this.attr("data-index");
            $imgItems.each(function(){
                var imgItem = $(this);
                if(imgItem.attr("data-index") == index){
                    $itemWrap.css("margin-left",0);
                    //退出循环
                    return false;
                } else {
                    $itemWrap.append($(".item-wrap .sub-item").first());
                }
                //导航按钮状态切换
                $imgIndexs.removeClass("active");
                $$this.addClass("active");
            });
        });
    });

    autoTurnRight();

    /*自动轮播*/
    function autoTurnRight(){
        timeInterval = setInterval(function(){
            $bannerRight.trigger("click");
        }, 3000);
    }

    /*取消自动轮播*/
    function cancerAutoTurnRight(){
        clearInterval(timeInterval);
    }
});