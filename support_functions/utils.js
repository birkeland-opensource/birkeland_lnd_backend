const jwt = require("jsonwebtoken");
const birkeland_wallet_item = require("./../birkeland_wallets/birkeland_wallet_item_model");
const test_birkeland_lnd = require('test_birkeland_lnd')
const jwt_decode = require('jwt-decode');
const node_user_schema_item_model = require("../node_authentication/node_user_schema_item_model");

exports.create_node_auth_jwt_token = (payload, private_key) => {
  return jwt.sign(payload, private_key, {
    expiresIn: "10 day",
  });
};

exports.decode_node_auth_jwt_token = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    let {email} = jwt_decode(token);
    let filter = {"email" : email};
    let return_object = {private_key: 1}
    let result = await node_user_schema_item_model.findOne(filter,return_object);
    if(result){
    jwt.verify(token, result["private_key"], (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      else{
         next();
         return;
      }
     
    });
  }else{
    return res.status(401).send({ message: "node auth failed" });
  }
  } catch (e) {
    return res.status(401).send({ message: "node auth failed" });
  }
};

exports.auth_birkeland_wallet_access = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    const {wallet_id} = req.query;
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }
    let resp = await birkeland_wallet_item.findOne({ read_key: token });
    if (resp) {
     
      if (resp["wallet_id"] == wallet_id) {
        next();
        return;

      } else {
        return res
          .status(401)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
    }
    return res
      .status(401)
      .send({ auth: false, message: "Failed to authenticate token." });
  } catch (err) {
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
  }
};

exports.get_node_public_key = async(res) =>{
  try{
    let get_identity_resp = await test_birkeland_lnd.PerformAuthenticatedOperation({operation : "get_identity"});
    if(get_identity_resp.success){
      return { success: true, public_key : get_identity_resp?.message?.public_key}
    }
    else{
      return res.status(500).send({ success: false, message: 'Error talking to node' });
    }
  }
  catch (err) {
    return res.status(500).send({ success: false, message: 'Error talking to node' });
  }
  }
