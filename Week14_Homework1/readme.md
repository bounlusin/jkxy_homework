- 所用框架： express

- 启动服务器文件： app.js

- 静态文件夹：public文件夹

- 数据库
	

	1. 数据库文件：baidu_news.sql

 	2. 登录用户名：admin

	3. 登录密码：admin

- Web安全漏洞处理
	
	1. node后台(app.js文件)通过引入xss模板，一定程度上防御xss攻击，也能防止SQL注入
	
	2. 表单提交都采用POST方式提交，防御csrf
	
	3. manage页面添加登录验证，不登录无法访问，登录信息储存在session中
	
	4. 页面上没有payload的插入漏洞

	5. 在表单提交时，增加了token验证，防御csrf