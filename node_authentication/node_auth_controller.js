const node_user_schema_item_model = require("./node_user_schema_item_model");
const bcrypt = require("bcrypt");
const { create_node_auth_jwt_token } = require("../support_functions/utils");
const { v4: uuidv4 } = require("uuid");

exports.check_endpoint_is_authenticated = async (req, res) => {
  try {
    return res.status(200).send({ success: true, message: "authenticated" });
  } catch (err) {}
};

const create_node_auth_password = async (req, res) => {
  try {
    var email = req.body.email;
    const userTaken = await validateEmail(email);
    if (userTaken) {
      return res.status(400).json({
        message: "Email in use reset your password",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    var userObject = {
      email: email,
      password: hashedPassword,
      user_id: uuidv4(),
      private_key: uuidv4(),
      is_password_set: true,
      date_created: new Date(),
      date_updated: new Date(),
    };
    var result = await node_user_schema_item_model.create(userObject);
    let payload = {
      email: result["email"],
      user_id: result["user_id"],
    };
    var auth_token = await create_node_auth_jwt_token(
      payload,
      result["private_key"]
    );
    return res.status(201).send({
      message: { node_auth_key: auth_token },
      success: true,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

exports.get_node_auth_token = async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
      var user = await node_user_schema_item_model.findOne({ email });
      if (user) {
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          let payload = {
            email: user["email"],
            user_id: user["user_id"],
          };

          var token = await create_node_auth_jwt_token(
            payload,
            user["private_key"]
          );

          return res.status(200).json({
            message: { node_auth_key: token },
            success: true,
          });
        } else {
          return res.status(403).json({
            message: "Failed login attempt",
            success: false,
          });
        }
      } else {
        await create_node_auth_password(req, res);
      }
    
  } catch (err) {
    return res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

const validateEmail = async (email) => {
  let user = await node_user_schema_item_model.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};
