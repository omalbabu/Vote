var express = require('express');
var app = express();
var exphbs=require('express-handlebars')
var connectDB=require('./config/db');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');


app.set('./views');
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use('/scripts', express.static(__dirname + '/css/'));
require('./config/passport')(passport);
//DataBase 
connectDB();

//express handlebars
app.engine('hbs',exphbs({extname:'hbs',defaultView:'Main',layoutsDir:__dirname+'/views/layout',partialsDir:__dirname+'/views/partial/',
helpers:{ 
   calc:value=>{ return value+2;},
   list:(value,options)=>
      {
         
      //console.log(value.length);
      let out="<UL>"
            for(let i=0;i<value.length;i++)
               {
                out=out+"<li>"+options.data[i].firstName+" "+options.data[i].lastName+"</li>";
               }
      return out=out+"</UL>"
   }
}

}));
app.set('view engine', 'hbs');

//--------------------------------
//body
app.use(express.urlencoded({extended:false}));

//session
app.use(session({
   secret: 'UserSecret',
   resave: true,
   saveUninitialized: true
   }));

   //Passport Authentication
   app.use(passport.initialize());
   app.use(passport.session());

app.use(flash());

app.use((req,res,next)=>{
   res.locals.success_msg=req.flash('success_msg');
   res.locals.error_msg=req.flash('error_msg');
   res.locals.error=req.flash('error');
   next();
});
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/user'));
app.use('/Votes',require('./routes/votes'));

const PORT=process.PORT||8080;
app.listen(8080,()=>{console.log(`Server Started on ${PORT}`)});