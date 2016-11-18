var express=require('express');
var path = require('path');
var bodyParser=require('body-parser');
var session = require('express-session');
var db_querys=require('./persistence/querys');
var aux1=require('./aux1');
var port=8080;
var app=express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', cookie: {}}));
app.get("/",function(req,res){
    res.redirect("login.html");
});
app.post("/validation",function(req,res){
    db_querys.getUser(req.body.user,function(user){
        console.log(user);
        if(user.length>0){
            console.log("lol: "+req.body.password);
            if(user[0].password==req.body.password){
                console.log("OK");
                req.session.a="OK";
                req.session.u=req.body.user;
                res.redirect("http://localhost:"+port+"/contactos");
            }
            else{
                console.log("ERROR");
                res.render("mensaje",{mensaje:"usuario o contraseña incorrecta"});
            }
        }
        else{
            res.render("mensaje",{mensaje:"no se encuentra usuario: "+req.body.user});
        }

    });
});
app.post("/registerUser",function(req,res){
    db_querys.createUser(req.body.user,req.body.name,req.body.password);
    res.render("mensaje",{mensaje:"el usuario ha sido creado"});
});
app.get("/contactos",function(req,res){
    var model={name:req.session.u};
    db_querys.getContacts(req.session.u,function(rows){
        model.contacts=rows;
        console.log(model);
        model.scontact=model.contacts[0];
        console.log(model.scontact);
        res.render("contactos",model);
    });

});
app.get("/contactos/:contact",function(req,res){
    var model={name:req.session.u};
    db_querys.getContacts(req.session.u,function(rows){
        model.contacts=rows;
        console.log(model);
        model.scontact={user :req.params.contact};
        for(var i=0;i<model.contacts.length;i++){
            if(req.params.contact==model.contacts[i].user){
                model.scontact.name=model.contacts[i].name;
                i=model.contacts.length;
            }
        }
        console.log(model.scontact);
        //model.aux="";
        res.render("contactos",model);
    });

});
app.get("/deleteContact/:user/:contact",function(req,res){
    db_querys.deleteContact(req.params.user,req.params.contact,function(rows){
        res.redirect("/contactos");
    });
});
app.get("/addContact/:user/:contact",function(req,res){
    db_querys.addContact(req.params.user,req.params.contact,function(rows){
        res.redirect("/contactos");
    });
});
app.get("/adminContacts",function(req,res){
    console.log("++++++++++++++++++++++"+req.session.u);
    db_querys.getUsersExep(req.session.u,function(rows){
        var model={users:rows,u:req.session.u};
        db_querys.getContacts(req.session.u,function(rows2){
            var contacts=[];
            for(var i=0;i<rows2.length;i++){
                contacts.push(rows2[i].user);
            }
            for(var i=0;i<model.users.length;i++){
                if(aux1.isContact(model.users[i].user,contacts)){
                    model.users[i].isContact=true;
                }
                else{
                    model.users[i].isContact=false;
                }
            }
            res.render("adminContacts",model);
        });

    });
});
app.listen(port,function(){
    console.log("app listening on port "+port);
})
