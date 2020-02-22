const express=require('express');
const router=express.Router();
const user=require('../models/user');
const bcrypt=require('bcryptjs');
const passport=require('passport');


router.get('/login',(req,res)=>{
    res.render('login');
    
});

router.get('/register',(req,res)=>{
    res.render('register');
    
});
router.post('/register',(req,res)=>{
  const {userName,email,password,password2}=req.body;
  console.log(req.body);
  let errors=[];
  if(!userName||!email||!password||!password2)
  {
    errors.push({msg:'Please fill in all fields'});
  }
  if(password!==password2)
  {
      errors.push({msg:'Password do not match'});
  }
  if(errors.length>0)
  {
    
  res.render('register',{errors,userName,email,password,password2})
  }
  else
  {
    user.findOne({email:email}).then(User=>{
      if(User)
      {
        errors.push({msg:'Email is already registred'});
       res.render('register',{errors,userName,email,password,password2});
      }
      else
      {
        const NewUser=new user({
          userName,
          email,
        password
        });
        bcrypt.genSalt(10,(err,salt)=>
        bcrypt.hash(NewUser.password,salt,(err,hash)=>
        {
          if(err)throw err;
          NewUser.password=hash;
          NewUser.save()
          .then(user=>{
            req.flash('success_msg','You are now registered and can log in.')
            res.redirect('/users/login');
            })
        .catch(err=>console.log(err));
        

        }));
      }
          });
    
  }
    
});


//Login 

router.post('/login',(req,res,next)=>
{
passport.authenticate('local',{  
  successRedirect:'/dashboard',
  failureRedirect:'/users/login',
  failureFlash:true
    })(req,res,next);
});

router.get('/logout',(req,res)=>
{
req.logOut();
req.flash('success_msg','You are logged out');
res.redirect('/users/login');
});

// router.post('/dashboard',(req,res)=>{
//   console.log('body request');
//   const {morningOrder,NoonOrder,eveningOrder}=req.body;
//   console.log(morningOrder,NoonOrder,eveningOrder);
// });
module.exports=router;
