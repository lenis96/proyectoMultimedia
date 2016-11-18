var exports = module.exports = {};
exports.getConnection=function(f){
	var mysql=require('mysql');
	var connection=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:'phprootlenis',
		database:'sv'
	});
	connection.connect();
	f(connection);
	connection.end();
}
