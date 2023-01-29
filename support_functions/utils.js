const jwt = require("jsonwebtoken");
const birkeland_wallet_item = require("./../birkeland_wallets/birkeland_wallet_item_model");
const test_birkeland_lnd = require('test_birkeland_lnd')

exports.createJWT = (payload) => {
  return jwt.sign(payload, "partOfTheJourneyIsTheEnd", {
    expiresIn: "1 day",
  });
};

exports.decodeAndAuthTokenJwtToken = async (req, res, next) => {
  //we receive objectId of the sessionid and retirve the object id from db and verify it.

  try {
    jwt.verify(req.query.jwtToken, "partOfTheJourneyIsTheEnd");
    next();
  } catch (e) {
    return res.status(401).send({ message: "Auth failed" });
  }
};

exports.create_node_auth_jwt_token = (payload) => {
  return jwt.sign(payload, "partOfTheJourneyIsTheEnd", {
    expiresIn: "1 day",
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
    console.log("Hello " + token);
    jwt.verify(token, "partOfTheJourneyIsTheEnd", (err, decoded) => {
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
