<?php

include('config.php');
/*
session_start();*/

$username = isset($_POST['username']) ? trim($_POST['username']) : "";
$password = isset($_POST['password']) ? trim($_POST['password']) : "";

$validate = 0;

if ($username == "admin" && $password == "admin") {
	$validate = 1;
}

if ($validate == 0){
	echo "登录失败，请输入正确的用户名和密码..";
} else {
	echo "登陆成功..";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<script type="text/javascript">
		var validate = <?php echo (int)$validate; ?>;
		localStorage.setItem('validate',validate);
		console.log(validate);
		// 延迟1秒
		setTimeout("autoRedirect()", "1000");
		// 决定重定向位置
		function autoRedirect(){
			if(validate>0){
				window.location.href = '../manage.html';
			}else{
				window.location.href = '../login.html';
			}
		}
	</script>
</head>
<body>
	
</body>
</html>