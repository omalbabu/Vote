var express = require('express');
var app = express();
var exphbs=require('express-handlebars')
const PORT=process.PORT||8080;
app.set('./views');
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

//express handlebars
app.engine('hbs',exphbs({extname:'hbs',defaultView:'Main',layoutsDir:__dirname+'/views/layout',


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

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/user'));
app.use('/Votes',require('./routes/votes'));

app.listen(8080,()=>{console.log(`Server Started on ${PORT}`)});