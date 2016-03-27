/**
 * Created by bounlusin on 2016/1/22.
 */

/*LearnCard 改变*/
define(function (require) {
    require("jQuery");

    $learnCard = $(".learn-card a");

    $learnCard.each(function(){
        $this = $(this);

        $this.mouseenter(function(){
            var item = $(this);
            item.css("border","1px solid #35b558");
            item.children(".green-btn").css({
                "color": "#ffffff",
                "background": "#35b558"
            });
            item.children(".waiting-btn").css("background","#ddd");
        }).mouseleave(function() {
            var item = $(this);
            item.css("border", "1px solid #E4E4E4");
            item.children(".green-btn").css({
                "color": "#35b558",
                "background": "#f3fff6"
            });
            item.children(".waiting-btn").css("background","#f3fff6");
        });
    });

});