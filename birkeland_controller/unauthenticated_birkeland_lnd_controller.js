const birkeland_lnd_custom_macaroon = require('birkeland_lnd_custom_macaroon')


exports.unauth_lnd_ops = async(req,res) =>{
    try{
        var ops_res = await birkeland_lnd_custom_macaroon.PerformUnAuthenticatedOperation(req.body);
        if(ops_res.success){
            return res.status(200).send({ success: true, message: ops_res?.message });
        }
        else{
            return res.status(500).send({ success: false, message: ops_res?.message });
        }
    }
    catch(err){
        return res.status(500).send({ success: false, message: err });
    }
}