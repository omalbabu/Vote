var Users=[];
var representatives =[];
const fs = require("fs");
var error = 0;

function initialize(){
    console.log('Initialize');
   
    //representatives = fs.readFileSync("./data/rep.json", 'utf8', function(err, data){
    representatives = fs.readFileSync("./data/rep.json", function(err, data){
        if(err){
            error = 1;
        }
         
        representatives = JSON.parse(data);
    
    });
   
}

    function check() {
      
        return new Promise(function(resolve,reject){
        
            if (error === 0){
                resolve("Success");
        
            }
            else if(error === 1){
               reject("unable to read file");
            }
        })     
     };

     var getAllrepresentatives = function(){
        initialize();
        return check().then(function(x){
        console.log(x);
        //console.log(representatives);
        return representatives;
        
        }).catch(function(x){
        console.log("No results returned");
       
        });
        }
            module.exports.getAllrepresentatives = getAllrepresentatives;
    