var express=require('express');
var path = require('path');
var bodyParser=require('body-parser');
var session = require('express-session');
var db_querys=require('./persistence/querys');
var port=8080;
var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: {}}));
app.get("/",function(req,res){
    res.send("hola mundo");
});
app.post("/register",function(req,res){
    db_querys.getUser(req.body.name,function(user){
        console.log(user);
        if(user.length>0){
            if(user[0].password==req.body.password){
                console.log("OK");
                req.session.a="OK";
                req.session.u=req.body.name;
                res.redirect("http://localhost:"+port+"/contactos");
            }
            else{
                console.log("ERROR");
                res.send("usuario o contraseña incorrecta");
            }
        }
        else{
            res.send("no se encuentra usuario: "+req.body.name);
        }

    });
});
app.get("/contactos",function(req,res){
    var model={name:req.session.u};
    db_querys.getContacts(req.session.u,function(rows){
        model.contacts=rows;
        for(var i=0;i<rows.length;i++){
            model.contacts[i].aux="contactos/";
        }
        console.log(model);
        model.scontact=model.contacts[0];
        console.log(model.scontact);
        //model.aux="contactos/";
        res.render("contactos",model);
    });

});
app.get("/contactos/:contact",function(req,res){
    var model={name:req.session.u};
    db_querys.getContacts(req.session.u,function(rows){
        model.contacts=rows;
        console.log(model);
        model.scontact={contact:req.params.contact};
        console.log(model.scontact);
        //model.aux="";
        res.render("contactos",model);
    });

});
app.listen(port,function(){
    console.log("app listening on port "+port);
})
