var exports = module.exports = {};
var connection=require('./connection');
exports.getUser=function(user,f){
    connection.getConnection(function(con){
        con.query("select * from users where user=?",[user],function(err,rows,fields){
            if(err) throw err;
            f(rows);
        });
    });
}

exports.getContacts=function(user,f){
    connection.getConnection(function(con){
        con.query("select contact from users join contacts on(users.user=contacts.user) where users.user=?",[user],function(err,rows,fields){
                if(err) throw err;
                f(rows);
        });
    });
}
/*
exports.getAll=function(f){
	connection.getConnection(function(con){
		con.query('select * from bookmarks',function(err,rows,fields){
		if(err) throw err;
		f(rows,fields);
		});
	});

}
exports.getById=function(id,f){
	connection.getConnection(function(con){
		con.query("select * from bookmarks where id=?",[id],function(err,rows,fields){
			if(err) throw err;
			f(rows[0]);
		});
	});
}
exports.delete=function(id,f){
	connection.getConnection(function(con){
		con.query("delete from bookmarks where id=?",[id],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
}
exports.insert=function(name,link,f){
	connection.getConnection(function(con){
		con.query("insert into bookmarks (name,link) values(?,?)",[name,link],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
}
exports.update=function(id,name,link ,f){
	connection.getConnection(function(con){
		con.query("update bookmarks set name=?,link=? where id=?",[name,link,id],function(err,rows,fields){
			if(err) throw err;
			f(rows);
		});
	});
}
*/
