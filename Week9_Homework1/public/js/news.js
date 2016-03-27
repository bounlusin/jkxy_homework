var type = "";

$(document).ready(function() {
    // 加载更多事件
    $('.load-more').click(function(event) {
        event.preventDefault();
        getNews(type, $('.news-list li').length, false);
    });
    // 标签切换事件
    $('.menu ul li').each(function(index, el) {
        $(el).click(function(event) {
            event.preventDefault();
            $('.menu ul li').each(function() {
                $('a', $(this)).removeClass('active');
            });
            $('a', $(el)).addClass('active');
            getNews($('a', $(el)).html(), 0, true);
        });
    });
    // 初始化新闻
    getNews('推荐', 0, true);
});

// 获取新闻
function getNews(getType, id, clean) {
    type = getType;
    // 清空当前内容
    if (clean) {
        $('.news-list').html('');
        $('#footer').hide();
        $('.load-more').hide();
    }
    $('.load-more').html('加载中...');
    // ajax 
    $.ajax({
            url: '/getNews',
            type: 'POST',
            dataType: 'json',
            data: {
                'type': type,
                'id': id
            }
        })
        // 获取完成
        .done(function(data) {
            // 隐藏加载条
            $(".loading").hide();
            if (!data.error) {
                // 添加数据
                for (var i = 0; i < data.responses.length; i++) {
                    var imgHtml = "";
                    // 是否有图片
                    if (data.responses[i].img != "") {
                        imgHtml = '<div class="pic-side"><img src="' + data.responses[i].img + '"></div>';
                    }
                    var html = '<li>' + imgHtml + '<div class="content-side"><span class="title">' +
                        data.responses[i].title + '</span>' +
                        '<span class="content">' + data.responses[i].content + '</span>' +
                        '<span class="time">' + data.responses[i].add_time + '</span></div></li>';
                    $('.news-list').append(html);
                }
                $('#footer').show();
                $('.load-more').show().html('点击加载更多');
            }
        })
        // 获取失败
        .fail(function() {
            console.error("server error!");
        });
}
