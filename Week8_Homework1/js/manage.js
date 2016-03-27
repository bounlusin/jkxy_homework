var allData = {};

var editingId = -1;

$(document).ready(function() {

    var validate = localStorage.getItem("validate");
    if (validate == 0){
        window.location.href = "login.html";
    } 
    // 所有新闻
    $('#manage').click(function(event) {
        event.preventDefault();
        getList('');
    });

    // 添加新闻
    $('#add').click(function(event) {
        event.preventDefault();
        showEditWindow(-1);
    });

    // 添加保存按钮
    $('#edit-btn-save').click(function(event) {
        event.preventDefault();
        if (editingId == -1) {
            editNews('add');
        } else {
            editNews('update');
        }
    });

    // 删除按钮
    $('#edit-btn-delete').click(function(event) {
        event.preventDefault();
        if (!$(this).hasClass('disabled')) {
            editNews('delete');
        }
    });

    // 分类
    $('#edit-type-select li').each(function(index, el) {
        $(el).on('click', function(event) {
            event.preventDefault();
            $('#edit-type').html($('a', $(this)).html());
        });
    });

    // 搜索
    $('#search-button').click(function(event) {
        event.preventDefault();
        getList($('#search-input').val());
    });

    // 退出登陆
    $('#logout').click(function(event) {
        event.preventDefault();
        localStorage.setItem("validate", 0);
        window.location.href = "login.html";
    });


    $('#waiting').hide();
    $('#edit-waiting').hide();

    getList("");
});

// 获取列表
function getList(keyword) {
    // 清空本地列表
    allData = {};
    $('#waiting').show();
    $('#search-button').addClass('disabled').html('查询中...');
    //ajax 
    $.ajax({
            url: 'php/queryNews.php',
            type: 'POST',
            dataType: 'JSON',
            data: { 'kw': keyword },
        })
        // 得到数据
        .done(function(data) {
            if (!data.error) {
                // 存储结果
                allData = data.responses.reverse();
                updateList();
            } else {
                console.warn('data error!');
            }
        })
        .always(function() {
            $('#waiting').hide();
            $('#search-button').removeClass('disabled').html('搜索');
        });
}

// 更新列表
function updateList() {
    // 添加结果到列表
    $('#newsList').html('');
    allData.forEach(function(element, index) {
        var newItem = $('<a class="list-group-item">')
            .append(element.news_title).hover(function() {
                $(this).addClass('active');
            }, function() {
                $(this).removeClass('active');
            }).click(function() {
                // 传送列表 id
                showEditWindow($(this).index('.list-group a'));
            });;
        $('#newsList').append(newItem);
    });
}

// 文章编辑
function showEditWindow(id) {
    editingId = id;
    var news_title = "";
    var news_type = "选择分类";
    var news_content = "";
    var news_img = "";
    var add_time = "";
    if (editingId != -1) {
        // 界面状态
        $('#edit-btn-save').html('保存更改');
        $('#edit-btn-delete').removeClass('disabled');
        news_title = allData[id].news_title;
        news_type = allData[id].news_type;
        news_content = allData[id].news_content;
        news_img = allData[id].news_img;
        add_time = allData[id].add_time;
    } else {
        $('#edit-btn-save').html('添加新闻');
        $('#edit-btn-delete').addClass('disabled');
    }
    $('#edit-type').html(news_type);
    $('#edit-title').val(news_title);
    $('#edit-content').val(news_content);
    $('#edit-img').val(news_img);
    $('#add-time').val(add_time);
    $('#editWindow').modal('show');
}

// 新闻操作
function editNews(operation) {
    $('#edit-waiting').show();
    // 获取新闻 id
    var newsId = (allData.length == 0 || editingId == -1) ? 0 : allData[editingId].news_id;
    // ajax
    $.ajax({
            url: 'php/editNews.php',
            type: 'POST',
            dataType: 'JSON',
            data: {
                operation: operation,
                title: $('#edit-title').val(),
                content: $('#edit-content').val(),
                type: $('#edit-type').html(),
                id: newsId,
                img: $('#edit-img').val(),
                add_time: $("#add-time").val()
            },
        })
        .done(function(data) {
            if (!data.error) {
                $('#editWindow').modal('hide');
                if (operation == "add") {
                    getList('');
                } else if (operation == "update") {
                    allData[editingId].news_title = $('#edit-title').val();
                    allData[editingId].news_content = $('#edit-content').val();
                    allData[editingId].news_type = $('#edit-type').html();
                    allData[editingId].news_img = $('#edit-img').val();
                    allData[editingId].add_time = $('#add-time').val();
                    updateList();
                } else if (operation == "delete") {
                    allData.splice(editingId, 1);
                    updateList();
                }
            } else {
                alert("操作失败");
            }
        })
        .fail(function() {
            alert("操作失败");
        })
        .always(function() {
            $('#edit-waiting').hide();
        });
}
