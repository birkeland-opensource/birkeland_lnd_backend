const birkeland_lnd_events_item = require("test_birkeland_lnd/mongoose_models/birkeland_lnd_event_model");
const { LND_SUBSCRIPTION_OPERATIONS } = require("test_birkeland_lnd/operations");


const get_lnd_event_list = async (req, res) => {

  return res.status(200).send({ success: true, message: LND_SUBSCRIPTION_OPERATIONS });
}

const get_event_info_of_operation = async (req, res) => {
  try {
    const {operation} = req.query;
    if(!operation){
      return res.status(400).send({ success: false, message: "operation is required" });
    }
    let filter = {
      operation: operation
    }
    let result = (await birkeland_lnd_events_item.find(filter)).reverse();
    return res.status(200).send({ success: true, message: result });
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

const get_event_info = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if(!page || !limit){
      return res.status(400).send({ success: false, message: "page and limit are required" });
    }

    const int_page = parseInt(req.query.page) || 1;
    const int_limit = parseInt(req.query.limit) || 10;
    const startIndex = (int_page - 1) * int_limit;
    const endIndex = int_page * int_limit;

    const count = await birkeland_lnd_events_item.countDocuments();

    let result = (await birkeland_lnd_events_item.find({}))
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(int_limit);

    const pagination = {};
    if (endIndex < count) {
      pagination.next = {
        page: int_page + 1,
        limit: int_limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: int_page - 1,
        limit: int_limit,
      };
    }

    return res.status(200).send({ success: true, message: result, pagination });
  } catch (err) {
    return res.status(400).send({ success: false });
  }
};

module.exports = {get_event_info_of_operation, get_event_info,get_lnd_event_list };
