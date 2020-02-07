const express=require('express');
const router=express.Router();
const ServRepres=require('../SERVICE/ElectionService')

let User=[{firstName: "Joe",lastName: "Smith"},{firstName: "Mark",lastName: "Suker"}];
router.get('/Votes',(req,res)=>{
   ServRepres.getAllrepresentatives().then((data) =>{
      res.render("PollingForm", { data:User, title: "Vote"});
  }).catch((err) => {
      res.render("PollingForm", { data: {}, title: "No result returned!" });
  })
});
module.exports=router;