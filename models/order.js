const mongoose=require('mongoose');
const orderScheme=new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    morningOrder:{
        type:Boolean,
        default:true
    },
    noonOrder:{
        type:Boolean,
        default:true
    },
    afternoonOrder:{
        type:Boolean,
        default:true
    }
});
const Order=mongoose.model('Order',orderScheme);
module.exports=Order;