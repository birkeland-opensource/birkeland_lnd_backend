const { PerformBtcCoreOperations } = require("../btc_core_operations/btc_core_ops_entry");


exports.btc_core_ops = async (req, res) => {
    try {
        var ops_res = await PerformBtcCoreOperations(req.body);
        if (ops_res.success) {
            return res.status(200).send({ success: true, message: ops_res?.message });
        }
        else {
            return res.status(500).send({ success: false, message: ops_res?.message });
        }
    }
    catch (err) {
        return res.status(500).send({ success: false, message: err });
    }
}