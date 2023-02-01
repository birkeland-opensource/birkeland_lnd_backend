let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVmZjQ1MjctODcyZi00NjkyLThhOWEtNzU5NzU4MDQ4NDEzIiwiZW1haWxfaWQiOiJiaXJrZWxhbmRAZ21haWwuY29tIiwiaWF0IjoxNjc1MTQ5NDE5LCJleHAiOjE2NzUyMzU4MTl9.o0m7Vvngj1YGGzhDNilLCbbS3KQc3tmbsNJ-H7PiiDU"

describe("birkeland_wallet_manipulation_test", () =>{

    it("get_wallets",(done) =>{
        chai.request(server)
        .get('/v1/wallets/wallets').set("x-access-token", access_token)
        .query({})
        .end((err,res) =>{
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            done();
        });
    }).timeout(4000);

});
