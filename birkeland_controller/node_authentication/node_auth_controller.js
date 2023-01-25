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