<?php

include('config.php');

//获取数据
$operation = isset($_POST['operation']) ? trim($_POST['operation']) : "";
$title = isset($_POST['title']) ? trim($_POST['title']) : "";
$content = isset($_POST['content']) ? trim($_POST['content']) : "";
$type = isset($_POST['type']) ? trim($_POST['type']) : "";
$id = isset($_POST['id']) ? trim($_POST['id']) : "";
$img = isset($_POST['img']) ? trim($_POST['img']) : "";
if ($operation == "add") {
	$add_time = date('Y-m-d H:i:s',time());
} else {
	$add_time = trim($_POST['add_time']);
}

if ($operation != "delete"){
	if ($content == "" || $type == "" || $title == ""){
		$error = true;
	}
} else {
	if ($id == "") {
		$error = true;
	}
}

if (!$error){
	mysql_query("set names 'utf8'", $db_con);
	mysql_select_db($db_name, $db_con);

	//拼接sql语句
	$sql = "";
	if ($operation == "add"){
		$sql = "insert into news (news_title, news_img, news_content, news_type, add_time) values('"
			.$title."','".$img."','".$content."','".$type."','".$add_time."')";
	} else if ($operation == "update"){
		$sql = "update news set news_title = '".$title."',
		news_img = '".$img."',news_content = '".$content."',
		news_type = '".$type."' where news_id = '".$id."'";
	} else if ($operation == "delete"){
		$sql = "delete from news where news_id = '".$id."'";
	}

	mysql_query($sql, $db_con);
}

//封装json数据并返回
$data = array(
	'error'=>$error,
);

header('Content-Type: application/json');
echo json_encode($data);

mysql_close($db_con);
?>