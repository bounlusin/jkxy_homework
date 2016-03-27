<?php
// 数据库地址
$db_host = "localhost";
// 数据库名称
$db_name = "baidu_news";
// 数据库账号
$db_username = "root";
// 数据库密码
$db_password = "root";

// 头部设置编码
header("content-type:text/html; charset=utf-8");
// 设置时间
date_default_timezone_set('Asia/Shanghai');

$error = false;

// 返回数据
$responses = array();

// 链接数据库
$db_con = mysql_connect($db_host,$db_username,$db_password) or $error = true;

?>