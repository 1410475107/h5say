const express 		= require('express');
const path 			= require('path');
const fs 			= require('fs');
const url 			= require('url');
const cookieParser 	= require('cookie-parser');
const session 		= require('express-session');
const multer 		= require('multer');
var svgCaptcha 		= require('svg-captcha');
var dateFormat 		= require('dateformat'); 
const globalFun 	= require('../../lib/global.fun.js');
const mydb 			= require('../../lib/mysql.js');
/*	
	规范的写法
	var rootpath 	= path.dirname(path.dirname(__dirname));
	const mydb 		= require(path.join(rootpath, 'lib/mysql.js'));
	const globalFun = require(path.join(rootpath, 'lib/global.fun.js'));
*/
module.exports = function (){
	var route = express.Router();
	//使用cookie
	var secret = 'app.h5say.com';
	route.use(cookieParser(secret));
	var co = {maxAge:30*24*3600*1000};
	route.use(session({
		secret:'123asdad45545',
		name:'session_id',
		resave: true,
  		saveUninitialized: true,
		cookie:{maxAge:1800*1000}
	}));

	//登录页面
	route.get('/', function(req, res){
		res.render('admin/login', {
			username:req.cookies.username, 
			passwd:req.cookies.passwd
		});
    });
    
    //登录验证页面
    route.post('/loginsubmit', function (req, res) {
		console.log(req.body);
		//对账号和密码进行验证
		var sql = 'SELECT * FROM admin WHERE username = ? LIMIT 1';
		mydb.query(sql, req.body.username, function(err, data){
			//用户输入的密码
			var pw = globalFun.md5(req.body.passwd);
			if(data.length){
				if(data[0].passwd == pw){
					//记录cookie和session
					//记住密码才需要cookie
					if(req.body.rember){
						res.cookie('username', 	req.body.username, 	co);
						res.cookie('passwd', 	req.body.passwd, 	co);
					}else{
						res.clearCookie('username', {maxAge:0});
						res.clearCookie('passwd', 	{maxAge:0});
					}
					//记录session
					req.session.username 	= data[0].username;
					req.session.aid 		= data[0].aid;

					//更新账号信息
					var sql1 = 'UPDATE admin SET lasttimes= ?, ip=?, loginnum = loginnum + 1 WHERE aid = ?';
					mydb.query(sql1, [new Date(), req.ip, data[0].aid], function(err, result){
					});
					res.json({r:'ok'});
				}else{
					res.json({r:'pw_error'});
				}
			}else{
				res.json({r:'username_no_exist'});
			}
		});
    });

    //静态资源托管
    route.use(express.static('view/admin'));

	//页面不存在处理
	// route.use('*', function(req, res){
	// 	res.render('admin/404');
	// });

	return route;
}