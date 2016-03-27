<?php
//引入数据库配置
include('config.php');

$keyword = isset($_POST['kw']) ? trim($_POST['kw']) : "";

//获取新闻
if (!$error){
	mysql_query("set names 'utf8'", $db_con);
	mysql_select_db($db_name, $db_con);

	if ($keyword != ""){
		$sql = "select * from news where news_title like '%$keyword%'";
	} else {
		$sql = "select * from news";
	}

	$result = mysql_query($sql, $db_con);

	while ($row = mysql_fetch_array($result)) {
		$responses[] = array(
			'news_id'=>$row['news_id'],
			'news_title'=>$row['news_title'],
			'news_img'=>$row['news_img'],
			'news_content'=>$row['news_content'],
			'news_type'=>$row['news_type'],
			'add_time'=>$row['add_time']
		);
	}
}

//封装为json数据返回
$data = array(
	'responses'=>$responses,
	'error'=>$error
);

header('Content-Type: application/json');
echo json_encode($data);

mysql_close($db_con);
?>