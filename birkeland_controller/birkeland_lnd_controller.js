const test_birkeland_lnd = require('test_birkeland_lnd')

exports.auth_lnd_ops = async(req,res) =>{
    try{
        let {operation} = req.body;
        var ops_res = await test_birkeland_lnd.PerformAuthenticatedOperation({operation : operation});
        console.log(ops_res)
        if(ops_res.success){
            return res.status(200).send({ success: true, message: ops_res?.message });
        }
        else{
            return res.status(500).send({ success: false, message: ops_res?.message });
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send({ success: false, message: err });
    }
}