const mongoose=require('mongoose');
//mongodb+srv://Omongo:<password>@cluster0-j6i1t.mongodb.net/test?retryWrites=true&w=majority
const URL='mongodb+srv://Omongo:omal%406698@cluster0-j6i1t.mongodb.net/test?retryWrites=true&w=majority';
const DBConnect=async()=>{
await mongoose.connect(URL,
    {  useCreateIndex: true,  useUnifiedTopology: true,useNewUrlParser: true})
    .then(()=>console.log('Connection Successful!'))
    .catch(e=>console.log('Db Error',e));


};

module.exports=DBConnect; 