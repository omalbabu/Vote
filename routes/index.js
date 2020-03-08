const express=require('express');
const router=express.Router();
const { ensureAuthenticated}=require('../config/auth');
var datetime = require('node-datetime');
const order=require('../models/order');

router.get('/',(req,res)=>{
    res.render('home');
});


router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    const seesiondata=req.session;
    //console.log(req.params);
    const userId=seesiondata.passport.user;
    //const UserName=null;
    console.log(userId);
   order.findOne({date:Date.now})
   .then(us=>{
        if(!us)
        {
            console.log('Order not found!.');
        }
        else{
           
           // UserName=us.userName;
            console.log(us);
        }
    });
    //   var dt = datetime.create();
    //       var formatted = dt.format('d/m/Y');
          //console.log(formatted);
      res.render('dashboard',{UserName:'omal',afternoonOrder:false});
  });

  router.post('/dashboard',(req,res)=>
  {
    const seesiondata=req.session;
      const Id=seesiondata.passport.user;
      console.log(req.sessionID);
    const {OrderDate,morningOrder,NoonOrder,eveningOrder}=req.body;
        const Order=new order(
            {
            user:Id,
            morningOrder,
            NoonOrder,
            eveningOrder,
            date:OrderDate
            });
Order.save();
console.log('orderig.....');
//console.log(sessData);
// order.findOne({userName:})
});
           

















































































module.exports=router;