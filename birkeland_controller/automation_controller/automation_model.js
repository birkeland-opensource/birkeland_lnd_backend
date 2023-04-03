const mongoose = require('mongoose')

const automation_schema = new mongoose.Schema({
    node_public_key :{
        type :  String ,
        required :  true ,
        unique :  true 
        },
    date_created :{
        type :  Date ,
        required :  true ,
        unique :  false 
        },
    date_updated :{
        type :  Date ,
        required :  true ,
        unique :  true 
        },  
    commands_array : {
        type :  [] ,
        required :  true ,
        unique :  false 
    },
    status  :{
        type :  Boolean ,
        required :  true ,
    }

});

const automation_schema_model = mongoose.model('automation_schema',automation_schema);

module.exports = automation_schema_model;

//Sample commnads array
/************************************************************************************************
 * {
 * operation : "open_channel",
 * params : {},
 * status : "pending",
 * timne_executed : "2021-01-01 00:00:00",
 * }
 * 
 * 
 * 
 */