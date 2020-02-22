const express=require('express');
const router=express.Router();
const { ensureAuthenticated}=require('../config/auth');
var datetime = require('node-datetime');
const order=require('../models/order');

router.get('/',(req,res)=>{
    res.render('home');
});


router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    //const seesiondata=req.session;
    //console.log(sessiondata);
      var dt = datetime.create();
          var formatted = dt.format('d/m/Y');
          //console.log(formatted);
      res.render('dashboard',{Today:formatted});
  });

  router.post('/dashboard',(req,res)=>
  {
      const sessData=req.session;
    const {userName,morningOrder,NoonOrder,eveningOrder}=req.body;
        const Order=new order(
            {
            userName,
            morningOrder,
            NoonOrder,
            eveningOrder
            });
Order.save();
console.log('orderig.....');
console.log(sessData);

});
 
module.exports=router;