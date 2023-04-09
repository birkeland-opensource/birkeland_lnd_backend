const birkeland_lnd_custom_macaroon = require('birkeland_lnd_custom_macaroon')

exports.auth_lnd_ops = async (req, res) => {
    try {
        let ops_res = await birkeland_lnd_custom_macaroon.PerformAuthenticatedOperation(req.body);
        console.log(ops_res)
        if (ops_res.success) {
            if (req.body?.operation == 'get_identity') {
                global.node_public_key = ops_res?.message?.public_key;
            }
            return res.status(200).send({ success: true, message: ops_res?.message });
        }
        else {
            return res.status(500).send({ success: false, message: ops_res?.message });
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).send({ success: false, message: err });
    }
}