const express 		= require('express');
const ejs 			= require('ejs');
const mysql 		= require('mysql');
const bodyParser 	= require('body-parser');
const server 		= express();

//模板引擎
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'view');
//接收POST数据
server.use(bodyParser.urlencoded({extended:false}));

//创建管理员登录路由
server.use('/adminlogin', require('./module/adminlogin/')());

//服务是需要监听端口的
// server.listen(81);
console.log('81....');

server.listen(81);
