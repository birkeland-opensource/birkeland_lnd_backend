const mongoose = require('mongoose')

const node_user_schema = new mongoose.Schema({
    email :{
        type :  String ,
        required :  true ,
        unique :  true 
        },
    user_id :{
        type :  String ,
        required :  true ,
        unique :  true 
        },

    password :{
        type :  String ,
        required :  true ,
        unique :  false 
        },
    date_created :{
        type :  Date ,
        required :  true ,
        unique :  false  
    },
    date_updated :{
        type :  Date ,
        required :  true ,
        unique :  false  
    },
    is_password_set  :{
        type :  Boolean ,
        required :  true ,
    }

});

const node_user_schema_item_model = mongoose.model('node_user_schema',node_user_schema);

module.exports = node_user_schema_item_model;