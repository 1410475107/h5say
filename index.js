global.express 		= require('express');
const ejs 			= require('ejs');
const bodyParser 	= require('body-parser');
const cookieParser 	= require('cookie-parser');
const session 		= require('express-session');
global.mydb 		= require('./lib/mysql.js');
global.globalFun 	= require('./lib/global.fun.js');
global.path 		= require('path');
const server 		= express();

//模板引擎
server.engine('html', ejs.renderFile);
server.set('view engine', 'html');
server.set('views', 'view');
//接收POST数据
server.use(bodyParser.urlencoded({extended:false}));
//使用cookie
var secret = 'app.h5say.com';
server.use(cookieParser(secret));
var co = {maxAge:30*24*3600*1000};
server.use(session({
    secret:'123asdad45545',
    name:'session_id',
    resave: false,
      saveUninitialized: true,
    cookie:{maxAge:24*3600*1000}
}));

//创建管理员登录路由
server.use('/adminlogin/', require('./module/adminlogin/')());
//创建后台路由
server.use('/admin/', require('./module/admin/')());

//服务是需要监听端口的
// server.listen(81);
console.log('81....');

server.listen(81);
