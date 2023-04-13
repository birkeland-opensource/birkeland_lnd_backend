const packageJson = require("./package.json");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require("./config/db");

const terminal_operation_router = require("./birkeland_router/terminal_operation_router/terminal_operation_router");
app.use("/terminal", terminal_operation_router);

const lnd_operation_router = require("./birkeland_router/lnd_operation_router");
app.use("/lnd", lnd_operation_router);

const btc_core_router = require("./btc_core_controller_and_router/btc_core_router");
app.use("/btc", btc_core_router);

const birkeland_wallet_router = require("./birkeland_wallets/birkeland_wallet_router");
app.use('/v1/wallets',birkeland_wallet_router);
const automation_router = require("./birkeland_controller/automation_controller/automation_router");
app.use('/auto',automation_router);


const birkeland_lnd_events_router = require("./birkeland_controller/birkeland_lnd_events/birkeland_lnd_events_router");
app.use("/lnd_events", birkeland_lnd_events_router);

app.get("/", (req, res) => {
  res
    .status(200)
    .send({
      success: true,
      message: "Birkeland server is running",
      version: packageJson.version,
    });
});

const port = 9990;

app.listen(port, () => {
  console.log("Running on port " + port);
});

module.exports = app;
