const express=require('express');
const router=express.Router();
const { ensureAuthenticated}=require('../config/auth');
var datetime = require('node-datetime');
router.get('/',(req,res)=>{
    res.render('home');
});

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
  
    var dt = datetime.create();
        var formatted = dt.format('d/m/Y');
        //console.log(formatted);
    res.render('dashboard',{Today:formatted});
});


 
module.exports=router;