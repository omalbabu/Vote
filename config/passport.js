const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bscript=require('bcryptjs');

const User=require('../models/user');
module.exports=function(passport){
passport.use(
    new LocalStrategy({usernameField:'email'},(email,password,done)=>
    {
        User.findOne({email:email})
        .then(user=>{
            if(!user)
            {
                return done(null,false,{message:'That email is not registered'});
            }
            bscript.compare(password,user.password,(err,isMatch)=>
            {
                if(err) throw err;
                if(isMatch) {return done(null,user);
                }
                else{
                    return done(null,false,{message:'Password incorrect'})
                }
            })
        })
    })
);

passport.serializeUser((user, done)=> {
    done(null, user.id,user.UserName);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}