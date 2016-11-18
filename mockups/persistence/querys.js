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
        con.query("select users.user, users.name from users join contacts on(users.user=contacts.contact and contacts.user=?) ",[user],function(err,rows,fields){
                if(err) throw err;
                f(rows);
        });
    });
}
exports.createUser=function(user,name,pass){
    connection.getConnection(function(con){
        con.query("insert into users values(?,?,?)",[user,pass,name],function(err,rows,fields){
            if(err) throw err;
        });
    });
}
exports.addContact=function(user,contact,f){
    connection.getConnection(function(con){
        con.query("insert into contacts values(?,?)",[user,contact],function(err,rows,fields){
            if(err) throw err;
            f(rows);
        });
    });
}
exports.deleteContact=function(user,contact,f){
    connection.getConnection(function(con){
        con.query("delete from contacts where(user=? and contact=?)",[user,contact],function(err,rows,fields){
            if(err) throw err;
            f(rows);
        });
    });
}
exports.getUsersExep=function(user,f){
    connection.getConnection(function(con){
        con.query("select user from users where(user!=?)",[user],function(err,rows,fields){
            if(err) throw err;
            f(rows);
        })
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
