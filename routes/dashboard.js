const express=require('express');
const router=express.Router();
const order=require('../models/order');
// const { ensureAuthenticated}=require('../config/auth');
// const bcrypt=require('bcryptjs');
// const passport=require('passport');

// router.post('/dashboard',(req,res)=>{
//     const {userName,morningOrder,NoonOrder,eveningOrder}=req.body;
// const Order=new order
// ({
// userName,
// morningOrder,
// NoonOrder,
// eveningOrder
// });
// Order.save();
// console.log(Order);

// });