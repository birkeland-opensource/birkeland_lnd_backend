
const jwt = require("jsonwebtoken");

exports.createJWT = (payload) => 
{
  
   return jwt.sign(payload, "partOfTheJourneyIsTheEnd", {
     expiresIn: "1 day",
   });
};

 exports.decodeAndAuthTokenJwtToken =  async (req, res,next) => {
   //we receive objectId of the sessionid and retirve the object id from db and verify it.
  
  try{
   console.log("Hello " + req.query.jwtToken);
   jwt.verify(req.query.jwtToken, "partOfTheJourneyIsTheEnd");
   next();
  }
  catch(e)
  {
   return res.status(401).send({message: "Auth failed"});  
  }
};

exports.create_node_auth_jwt_token = (payload) => 
{
  
   return jwt.sign(payload, "partOfTheJourneyIsTheEnd", {
     expiresIn: "1 day",
   });
};

exports.decode_node_auth_jwt_token =  async (req, res,next) => {
    //we receive objectId of the sessionid and retirve the object id from db and verify it.
   
   try{
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    console.log("Hello " + token);
    jwt.verify(token, "partOfTheJourneyIsTheEnd", (err, decoded) => {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.id;
      next();
    });
   }
   catch(e)
   {
    return res.status(401).send({message: "node auth failed"});  
   }
 };