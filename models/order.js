const mongoose=require('mongoose');
const user=require('../models/user');
const Schema = mongoose.Schema;
const orderScheme=new mongoose.Schema({
    user:{ type:Schema.Types.ObjectId,
        ref:'user',
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
    },
    date:{
        type:Date
    }
});
const Order=mongoose.model('Order',orderScheme);
module.exports=Order;