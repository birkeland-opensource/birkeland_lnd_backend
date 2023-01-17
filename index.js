


const express = require('express');
const app = express();
const cron = require('node-cron');
const bodyParser = require('body-parser');
const cors = require('cors');

 const {poll_and_update_on_chain_transaction} = require("./support_functions/polling_service")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors()); 

require('./config/db');


//cron.schedule('1 * * * * *', poll_and_update_on_chain_transaction);

var terminal_operation_router = require("./birkeland_router/terminal_operation_router/terminal_operation_router");
app.use('/terminal',terminal_operation_router);

var lnd_operation_router = require("./birkeland_router/lnd_operation_router");
app.use('/lnd',lnd_operation_router);

var birkeland_wallet_router = require("./birkeland_wallets/birkeland_wallet_router");

app.use('/v1/wallets',birkeland_wallet_router);

app.get("/",(req,res)=>{

    res.status(200).send({success:true, message : "Balances of Statoshi API endpoint is running"});
  });

  const port = 9990;
  
  app.listen(port, () => 
{
    console.log('Running on port ' + port);
});

module.exports = app;



// if ! [[ -x "$(command -v docker)" ]]; then
// echo "Docker not installed"
// fi

// else 
// echo "Trying to install docker..."
// curl -fsSL https://get.docker.com -o get-docker.sh
// chmod +x get-docker.sh
// sh get-docker.sh
// rm get-docker.sh