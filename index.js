

const packageJson = require('./package.json');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const jsyaml = require('js-yaml');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors()); 
require('./config/db');


var terminal_operation_router = require("./birkeland_router/terminal_operation_router/terminal_operation_router");
app.use('/terminal',terminal_operation_router);

var lnd_operation_router = require("./birkeland_router/lnd_operation_router");
app.use('/lnd',lnd_operation_router);

var btc_core_router = require("./btc_core_controller_and_router/btc_core_router");

app.use('/btc',btc_core_router);


var birkeland_wallet_router = require("./birkeland_wallets/birkeland_wallet_router");

app.use('/v1/wallets',birkeland_wallet_router);

app.get("/",(req,res)=>{

    res.status(200).send({success:true, message : "Birkeland server is running", version :packageJson.version, server_type: "no_core"});

  });

  app.get("/v1/hello",(req,res)=>{

    res.status(200).send({success:true, message : "Birkeland server is running", version :packageJson.version});

  });


  const port = 9990;

  
  
var spec = fs.readFileSync('./swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  

  app.listen(port, () => 
{
    console.log('Running on port ' + port);
});

module.exports = app;
