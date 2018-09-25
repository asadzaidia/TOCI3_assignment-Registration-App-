
const express=require('express');
var app=express();
const bodyparser=require('body-parser');
const path=require('path');
var hbs=require('express-handlebars');
const flash=require('express-flash');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const nano = require("nano")("http://asad:asad@couchdb:5984"); 
const db=nano.use('registers');
 
app.use(express.static(__dirname + '/public'));
app.engine('hbs',hbs({extname:'hbs',layoutsDir:__dirname+ '/views/'}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret:'12345',
    saveUninitialized:true,
    resave:true
}));


app.listen(3000,()=>{
    console.log("Express server is running at port no: 3000");
});

// GET method route
app.get('/', function (req, res) {
    res.render('register');
  });
    
  // POST method route
  app.post('/', function (req, res) {
    var username = req.body.uname;
    var email =req.body.email;
    var pass =req.body.password;

    db.insert(
        {
            em:email,
            un:username,
            pa:pass
        }
    ).then((body)=>{
        req.flash('signupMessage','Successfully Registered!');
        res.render('register',{
         msg:req.flash('signupMessage')   
             });
    });


  });