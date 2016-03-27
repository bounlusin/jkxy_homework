/**
 * Created by bounlusin on 2016/1/14.
 */

$(document).ready(function(){

    var dataImg = {"data":[{"src":"10.jpg"},
        {"src":"2.jpg"},
        {"src":"8.jpg"},
        {"src":"4.jpg"},
        {"src":"6.jpg"},
        {"src":"5.jpg"},
        {"src":"7.jpg"},
        {"src":"3.jpg"},
        {"src":"9.jpg"},
        {"src":"1.jpg"}]};

    /*监听滚动事件*/
    window.onscroll = function(){
        var time = setTimeout(function () {
            $.each(dataImg.data, function(index, value){
                var box = $("<div>").addClass("box").appendTo($("#container"));
                var content = $("<div>").addClass("content").appendTo(box);
                /*console.log("./img/"+$(value).attr("src"));*/
                $("<img>").attr("src", "./img/"+value.src).appendTo(content);
            });
            imageLocation();
        }, 500);

        if (scrollSide()) {
            time;
        } else {
            clearTimeout(time);
        }
    };

    imageLocation();

    /*回到顶部*/
    $("#top").click(function(){
        $("body, html").animate({scrollTop:0},500);
    });

    /*判断是否加载图片*/
    function scrollSide(){
        var box = $(".box");
        var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
        var documentHeight = $(document).width();
        var scrollHeight = $(window).scrollTop();
        return (lastBoxHeight < documentHeight + scrollHeight) ? true : false;
    }

    /*确定图片位置*/
    function imageLocation(){
        var box = $(".box");
        var boxWidth = box.eq(0).width();                           //等宽图片的宽度
        var num = Math.floor($(window).width()/boxWidth);           //最多一行放多少张图片
        var boxArray = [];                                          //记录每列图片的高度
        box.each(function(index, value){
            var boxHeight = box.eq(index).height();
            if (index<num){                                         //第一行直接放置
                boxArray[index] = boxHeight;
            } else {                                                //确定图片的位置
                var minBoxHeight = Math.min.apply(null, boxArray);
                var minBoxIndex = $.inArray(minBoxHeight, boxArray);
                $(value).css({
                    "position": "absolute",
                    "top": minBoxHeight,
                    "left": box.eq(minBoxIndex).position().left
                });
                boxArray[minBoxIndex] += boxHeight;
            }
        });
    }
});
