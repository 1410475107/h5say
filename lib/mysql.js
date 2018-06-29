const mysql 		= require('mysql');
//数据库连接
module.exports = function(){
	var mydb = mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'123456',
		port:3306,
		database:'h5say'
	});
	mydb.connect(function(err){
		if(err){
			console.log(err);
			console.log('数据库连接错误');
			return ;
		}
	});
	//防止乱码
	mydb.query('SET NAMES UTF8');
	return mydb;
}();

