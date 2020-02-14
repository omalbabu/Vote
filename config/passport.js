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
            bscript.compare(passport,user.password,(user,isMatch)=>
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
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
      done(err, user);
    });
  });
}