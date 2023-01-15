const test_birkeland_lnd = require('test_birkeland_lnd')

exports.auth_lnd_ops = async(req,res) =>{
    try{
        let {operation} = req.body;
        var ops_res = test_birkeland_lnd.PerformAuthenticatedOperation({operation : operation});
        if(ops_res.success){
            return res.status(200).send({ success: true, message: ops_resp?.message });
        }
        else{
            return res.status(500).send({ success: false, message: ops_resp?.message });
        }
    }
    catch(err){
        return res.status(500).send({ success: false, message: err });
    }
}