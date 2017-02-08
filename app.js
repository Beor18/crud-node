const express = require("express");
const app = express()
const mysql = require("mysql")
const bodyParser= require('body-parser')

app.use("/bootstrap",express.static(__dirname+"/bootstrap"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

//Conexion con MySql
con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"romanos18",
	database:"nodeapp"
});

// Servidor express en puerto 3000
app.listen(3000,function(){
console.log("Escuchando en puerto 3000 ...");
});

//Index
app.get("/",function(req,res){
//res.send("Hola Mundo");
//res.sendFile(__dirname+"/index.html");
con.query("select * from person",function(e,r){
	res.render("index.ejs",{persons:r});
});
});

//Se agrega nuevo contacto
app.get("/new",function(req,res){
	res.render("new.ejs",{});
});

//Se guarda contacto
app.post("/save",function(req,res){
	console.log(req.body.person.nombre)
	var nombre = req.body.person.nombre;
	var apellido = req.body.person.apellido;
	var telefono = req.body.person.telefono;
	con.query("insert into person (nombre,apellido,telefono,created_at) value (\""+nombre+"\",\""+apellido+"\",\""+telefono+"\",NOW())",function(e,r){
	});
	res.redirect("/");
});

// Se edita contacto
app.get("/edit/:personid",function(req,res){
con.query("select * from person where id="+req.params.personid,function(e,r){
	res.render("edit.ejs",{person:r[0]});
});
});

// Se actualiza contacto
app.post("/update",function(req,res){
	console.log(req.body.person.nombre)
	var id = req.body.person.id;
	var nombre = req.body.person.nombre;
	var apellido = req.body.person.apellido;
	var telefono = req.body.person.apellido;
	con.query(" update person set nombre=\""+nombre+"\",apellido=\""+apellido+"\",telefono=\""+telefono+"\" where id="+id,function(e,r){
	});
	res.redirect("/edit/"+id);
});

//Se elimina contacto
app.get("/delete/:personid",function(req,res){
	con.query("delete from person where id="+req.params.personid,function(e,r){
	});
	res.redirect("/");
});
