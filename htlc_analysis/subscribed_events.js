const {authenticatedLndGrpc,subscribeToForwards} = require('lightning');
const fs = require("fs");

const get_authenticated_lnd = () => {
    const tls_cert = fs.readFileSync("/etc/birkeland/tlscert", {
      encoding: "utf8",
      flag: "r",
    });

    const macroon = fs.readFileSync("/etc/birkeland/btc_admin_macroon", {
      encoding: "utf8",
      flag: "r",
    });

    const { lnd } = authenticatedLndGrpc({
      cert: tls_cert,
      macaroon: macroon,
      socket: "127.0.0.1:10009",
    });

    return lnd;
  };


const subscribeToForwards = async () => {

 console.log("subscribeToForwards")   
 let lnd = get_authenticated_lnd();
  const forwardEventEmitter = subscribeToForwards({lnd});

  forwardEventEmitter.on('forward', forward => {
    console.log('Forward event:', forward);
  });

  forwardEventEmitter.on('error', err => {
    console.error('Error:', err);
  });

  forwardEventEmitter.on('end', () => {
    console.log('End of subscription');
  });
};

subscribeToForwards();
