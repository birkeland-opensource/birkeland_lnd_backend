const { create_node_auth_jwt_token } = require("../../support_functions/utils");
const node_user_schema_item_model = require("./node_user_schema_item_model");
const bcrypt = require("bcrypt");
const { create_node_auth_jwt_token } = require("../../support_functions/utils");

exports.get_node_auth_token = async(req,res) => {
    try{
        let {user_id, email_id} = req.query;
        let payload = {user_id: user_id, email_id: email_id}
        let node_auth_token = create_node_auth_jwt_token(payload);
        return res.status(200).send({ success: true, message:{node_auth_token : node_auth_token}  });
    }
    catch(err){
        return res.status(400).send({ success: false, message: err });
    }
}

exports.check_endpoint_is_authenticated = async(req, res) => {
    try{
        return res.status(200).send({ success: true, message:"authenticated" });
    }
    catch(err){

    }
}

exports.create_node_auth_password = async (req, res) =>{
    try{
        var email = req.body.email;
        const userTaken = await validateEmail(email);
        if(userTaken) {
            return res.status(400).json({
                message: "Email in use reset your password",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 16);
        var userObject = {
            email : email,
            password :hashedPassword,
            date_created : new Date(),
            date_updated : new Date()
        }
        var result = await node_user_schema_item_model.create(userObject);
        return res.status(201).send({
            message: "Account successfully created",
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message,
            success: false,
        });
    }
    }

exports.get_node_auth_token = async (req, res) =>{

    try{
        var email = req.body.email;
        var password = req.body.password;
        const user = await node_user_schema_item_model.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: "Failed login attempt",
                email: "Incorrect email",
                success: false,
            })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(isMatch) {
            let payload = {
                user_id: user._id,
                email: user.email,
                name: user.userName,
            }
            
            var token = await createJWT(payload);

            let profile = {
                email: user.email,
                name: user.userName,
            };
            let result = {
                user: profile,
                token: token,
            };
            return res.status(200).json({
                ...result,
                message: "success",
                success: true
            });
        }
        else {
            return res.status(403).json({
                message: "Failed login attempt",
                success: false
            })
        }
    }
    catch(err){
        return res.status(500).send({
            message: err.message,
            success: false,
        });

    }
}


const validateEmail = async (email) => {
    let user = await node_user_schema_item_model.findOne({ email });
    if(user) {
        return true;
    } else {
        return false;
    }
};