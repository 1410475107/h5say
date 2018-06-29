module.exports = function (){
	var route = express.Router();
    //如果没有登录，就跳转到登录页面
    route.use(function(req, res, next){
        console.log(req.session.username);
		if (
			!req.session.username && !path.parse(req.url).ext
		) {
			res.redirect('/adminlogin/');
		} else {
			next();
		}
	});

	//登录页面
	route.get('/index', function(req, res){
		res.render('admin/index', {
			username:req.cookies.username, 
			passwd:req.cookies.passwd
		});
    });
    //静态资源托管
    route.use(express.static('view/admin'));

	//页面不存在处理
	route.use('*', function(req, res){
		res.render('admin/404');
	});

	return route;
}