var express = require('express');
var mysql = require('mysql');
var du = require('date-utils');
var bodyParser = require('body-parser');
var session = require('express-session');
var xss = require('xss');
var app = express();
var port = 3000;

//配置静态文件
app.use(express.static('public'));

//配置body-parser中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 配置路由
 */
//获取新闻
app.post('/getNews', function(req, res) {
    var connection = getConnection();
    var type = req.body.type;
    var id = req.body.id;
    var sql = `select * from news where news_type = '` + type + `' limit ` + id + `,5`;
    console.log(sql);
    connection.connect();
    connection.query(sql, function(error, rows) {
        if (error) throw error;
        var responses = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var response = {
                'title': xss(row['news_title']),
                'content': xss(row['news_content']),
                'img': xss(row['news_img']),
                'add_time': row['add_time'].toLocaleString()
            };
            responses.push(response);
        }
        var data = {
            'responses': responses,
            'error': error,
            'sql': sql
        };
        res.json(data);
    });
    connection.end();
});

//登录验证
app.post('/loginValidate', function(req, res) {
    var connection = getConnection();
    var username = req.body.username;
    var password = req.body.password;
    var sql = `select * from user where username = '` + username + `' and password = '` + password + `'`;
    connection.connect();
    connection.query(sql, function(error, rows) {
        if (error) throw error;
        if (rows.length > 0) {
            session.userid = rows[0].id;
            res.redirect('http://localhost:3000/manage.html');
        } else {
            session.userid = -1;
            res.redirect('http://localhost:3000/login.html');
        }
    });
    connection.end();
});

// 查询新闻
app.post('/queryNews', function(req, res) {

    if (session.userid == -1 || session.userid == undefined) {
        res.json({ error: 'loginError' });
    }

    var connection = getConnection();
    var keyword = xss(req.body.kw);
    if (keyword != "") {
        var sql = `select * from news where news_title like '%` + keyword + `%'  order by news_id desc`;
    } else {
        var sql = `select * from news where 1 = 1 order by news_id desc`;
    }

    connection.connect();
    connection.query(sql, function(error, rows) {
        if (error) throw error;
        var responses = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var response = {
                'news_id': row['news_id'],
                'news_title': xss(row['news_title']),
                'news_content': xss(row['news_content']),
                'news_img': xss(row['news_img']),
                'add_time': row['add_time'].toLocaleString(),
                'news_type': row['news_type']
            };
            responses.push(response);
        }
        var data = {
            'responses': responses,
            'error': error,
            'sql': sql
        };
        res.json(data);
    });
    connection.end();
});

//编辑新闻
app.post('/editNews', function(req, res) {

    if (session.userid == -1) {
        res.json({ error: 'error' });
    }

    var connection = getConnection();
    var operation = req.body.operation;
    var title = xss(req.body.title);
    var content = xss(req.body.content);
    var type = req.body.type;
    var id = req.body.id;
    var img = xss(req.body.img);
    var error = false;

    if (operation == "add") {
        var dt = new Date();
        var add_time = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
    } else {
        var add_time = req.body.add_time;
    }

    if (operation != "delete") {
        if (content == "" || type == "" || title == "") {
            error = true;
        }
    } else {
        if (id == "") {
            error = true;
        }
    }

    if (!error) {
        var sql = ``;
        if (operation == "add") {
            sql = `insert into news (news_title, news_type, news_content, news_img, add_time)
             values('` + title + `', '` + type + `', '` + content + `', '` + img + `', '` + add_time + `')`;
        } else if (operation == "update") {
            sql = `update news set news_title = '` + title + `',
        news_img = '` + img + `',news_content = '` + content + `',
        news_type = '` + type + `' where news_id = '` + id + `'`;
        } else if (operation == "delete") {
            sql = `delete from news where news_id = '` + id + `'`;
        }
        console.log(sql);
        connection.connect();
        connection.query(sql, function(err, rows) {
            if (err) throw err;
            var data = {
                error: error
            };
            res.json(data);
        });
        connection.end();
    }
});

//manage页面验证
app.post('/validate', function(req, res) {
    var mes = req.body.mes;
    if (mes == "loginValidate") {
        if (session.userid == -1 || session.userid == undefined) {
            res.json({ mes: "loginError" });
        } else {
            res.json({ mes: "loginSuccess" });
        }
    } else if (mes == "logout") {
        session.userid = -1;
        res.json({ mes: "logoutSuccess" });
    }
});

//获取数据库连接
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'baidu_news',
        port: 3306
    });
}

//开启服务 监听port = 3000的端口 
app.listen(port, function() {
    console.log('server is running on ' + port);
});
