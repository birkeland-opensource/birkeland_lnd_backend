
const birkeland_lnd_events_item = require("test_birkeland_lnd/mongoose_models/birkeland_lnd_event_model");

const get_event_info = async (req, res) => {
    try {
      let result = (await birkeland_lnd_events_item.find({})).reverse();
     return res.status(200).send({ success: true, message: result });

      }
     catch (err) {
      return res.status(400).send({ success: false });
    }
  };



  module.exports = {get_event_info};