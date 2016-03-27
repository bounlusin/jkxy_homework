/**
 * Created by bounlusin on 2016/1/22.
 */

/*隐藏模块显示*/
define(function (require){
    require("jQuery");

    $navBox = $(".navbox");
    $navpanel = $(".navpanel");
    $panelItem = $(".panel-item");
    $lessonDiv = $(".lesson-div");

    /*nav*/
    $navBox.mouseenter(function(){
        $navpanel.css("display", "block");
    }).mouseleave(function(){
        $navpanel.css("display", "none");
    });

    $panelItem.each(function(){
        $this = $(this);
        $angel = $(".angle");
        $this.mouseenter(function(){
            $$this = $(this);
            var index = $$this.attr("data-index");

            $panelItem.each(function(){
                var item = $(this);
                if (item.attr("data-index") == index){
                    item.css("background", "#f7f7f7");
                } else {
                    item.css("background", "#ffffff");
                }
            });

            $angel.each(function(){
                var item = $(this);
                if (item.attr("data-index") == index){
                    item.css("display", "inline-block");
                } else {
                    item.css("display", "none");
                }
            });
        }).mouseleave(function(){
            $$this = $(this);
            var index = $$this.attr("data-index");
            $panelItem.each(function(){
                var item = $(this);
                item.css("background", "#ffffff");
            });
            $angel.each(function(){
                var item = $(this);
                item.css("display", "none");
            });
        });
    });

    /*课程列表*/
    $lessonDiv.each(function(){
        $lessonListShow = $(".lesson-list-show");
        $this = $(this);
        $this.mouseenter(function(){
            $$this = $(this);
            var index = $$this.attr("data-index");

            $lessonDiv.each(function(){
                var item = $(this);
                if (item.attr("data-index") == index){
                    item.css({
                        "border-left": "2px solid #35b558",
                        "border-right": "2px solid #ffffff",
                        "background": "#ffffff",
                        "color": "#35b558"
                    });
                } else {
                    item.css({
                        "border": "1px solid #F5F5F5",
                        "border-bottom" : "none",
                        "background" : "#fff url('./img/more-icon_d39346f.png') 186px center no-repeat",
                        "background-size": "6px 10px",
                        "color": "#333"
                    });
                }
            });

            $lessonListShow.each(function(){
                var item = $(this);
                if (item.attr("data-index") == index){
                    item.css("display", "block");
                } else {
                    item.css("display", "none");
                }
            });
        }).mouseleave(function(){

            $lessonDiv.each(function(){
                var item = $(this);
                item.css({
                    "border": "1px solid #F5F5F5",
                    "border-bottom" : "none",
                    "background" : "#fff url('./img/more-icon_d39346f.png') 186px center no-repeat",
                    "background-size": "6px 10px",
                    "color": "#333"
                });
            });

            $lessonListShow.each(function(){
                var item = $(this);
                item.css("display", "none");
            });
        });
    });

    /*切换课程*/
    $("#hot-lesson ul li").each(function(){
        $this = $(this);
        $lessonList = $(".lesson-list");
        $this.mouseenter(function(){
            var index = $(this).attr("data-index");
            $lessonList.each(function() {
                var item = $(this);
                if (item.attr("data-index") == index){
                    item.css("display","block");
                } else{
                    item.css("display", "none");
                }
            });

            $("#hot-lesson ul li").each(function() {
                var item = $(this);
                if (item.attr("data-index") == index){
                    item.addClass("on");
                } else {
                    item.removeClass("on");
                }
            });
        });
    });

    /*课程显示更多信息*/
    $(".lesson-list li").each(function(){
        $this = $(this);
        $this.mouseenter(function(){
            var item = $(this);
            var lessonImgBox = item.children(".lessonimg-box");
            var lessonInfo = item.children(".lesson-infor");

            lessonImgBox.children(".lesson-shoucang").css("display","block");
            lessonImgBox.children("a").children(".lessonplay").animate({"opacity":1}, 500);
            lessonInfo.css("height", "180px");
            lessonInfo.children(".timeandicon").children(".cf").children("dl").children(".zhongji").css("display", "block");
            lessonInfo.children(".timeandicon").children(".cf").children(".learn-number").css("display", "block");
            lessonInfo.children(".timeandicon").children(".cf").children(".lessonicon-box").css("top", "25px");
            lessonInfo.children("p").slideDown();
        }).mouseleave(function(){
            var item = $(this);
            var lessonImgBox = item.children(".lessonimg-box");
            var lessonInfo = item.children(".lesson-infor");

            lessonImgBox.children(".lesson-shoucang").css("display","none");
            lessonImgBox.children("a").children(".lessonplay").animate({"opacity":0}, 500);
            lessonInfo.css("height", "88px");
            lessonInfo.children(".timeandicon").children(".cf").children("dl").children(".zhongji").css("display", "none");
            lessonInfo.children(".timeandicon").children(".cf").children(".learn-number").css("display", "none");
            lessonInfo.children(".timeandicon").children(".cf").children(".lessonicon-box").css("top", 0);
            lessonInfo.children("p").slideUp();
        });
    });

    /*？显示span*/
    $(".way").each(function() {
        $this = $(this);

        $this.mouseenter(function(){
            var item = $(this);
            item.next().animate({
                "opacity": 1,
                "margin-left" : 0
            }, 400);
        }).mouseleave(function(){
            var item = $(this);
            item.next().animate({
                "opacity":"0",
                "margin-left": "-5px"
            }, 400);
        });

    });

    /*课程卡片翻转*/
    $(".flipper").each(function(){
        $this = $(this);

        $this.mouseenter(function(){
            var item = $(this);
            item.children(".front").css({
                "transform": "rotateY(-180deg)"
            });
            item.children(".back").css({
                "transform": "rotateY(0deg)"
            });
        }).mouseleave(function() {
            var item = $(this);
            item.children(".front").css({
                "transform": "rotateY(0deg)"
            });
            item.children(".back").css({
                "transform": "rotateY(-180deg)"
            });
        });
    });
});