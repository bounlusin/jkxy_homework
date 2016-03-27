<?php

// 引入数据库配置
include('config.php');

$type = isset($_POST['type']) ? trim($_POST['type']) : "推荐";
$id = isset($_POST['id']) ? trim($_POST['id']) : "0";

if($id == "" || $type == ""){
	$error = true;
}

// 获取新闻
if(!$error){
	mysql_query("set names 'utf8'", $db_con);
	mysql_select_db($db_name, $db_con);

	$sql = "select * from news where news_type = '$type' limit $id, 5";
	$result = mysql_query($sql, $db_con);
	// 输出数据
	while ($row = mysql_fetch_array($result)) {
		$responses[] = array(
			'title'=>$row['news_title'],
			'content'=>$row['news_content'],
			'img'=>$row['news_img'],
			'add_time'=>$row['add_time']
		);
	}
}

// 封装json数据并返回
$data = array(
	'responses'=>$responses,
	'error'=>$error,
	'sql'=>$sql
);

header('Content-Type: application/json');
echo json_encode($data);

mysql_close($db_con);
?>