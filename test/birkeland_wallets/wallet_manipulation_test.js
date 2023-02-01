let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
let should = chai.should();

chai.use(chaiHttp);

var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVmZjQ1MjctODcyZi00NjkyLThhOWEtNzU5NzU4MDQ4NDEzIiwiZW1haWxfaWQiOiJiaXJrZWxhbmRAZ21haWwuY29tIiwiaWF0IjoxNjc1MjM4MzUxLCJleHAiOjE2NzUzMjQ3NTF9.tWYHcMWPpdnPm3ymDx3Ll5B2S8tX0peQAP73WKy2x1E"
var fake_access_token = "fake_access_token";
var test_user_id = "test_user_id"
var date = new Date();

describe("create_wallet", ()=>{

    it("When_create_wallet_is_called_with_proper_auth_then_success",(done) =>{
        chai.request(server)
        .post('/v1/wallets/wallet').set("x-access-token", access_token)
        .query({user_id : test_user_id})
        .send({wallet_name : `${date}-test_wallet`})
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            done();
        });
    }).timeout(10000);

});


describe("create_wallet", ()=>{

    it("When_create_wallet_is_called_with_fake_auth_then_return_401_and_auth_false",(done) =>{
        chai.request(server)
        .post('/v1/wallets/wallet').set("x-access-token", fake_access_token)
        .query({user_id : test_user_id})
        .send({wallet_name : `${date}-test_wallet`})
        .end((err,res) =>{
            res.should.have.status(401);
            res.body.should.have.property('auth').eql(false);
            done();
        });
    }).timeout(10000);

});

describe("create_wallet", ()=>{

    it("When_create_wallet_is_called_with_no_auth_then_return_401_and_auth_false",(done) =>{
        chai.request(server)
        .post('/v1/wallets/wallet')
        .query({user_id : ""})
        .send({wallet_name : `${date}-test_wallet`})
        .end((err,res) =>{
            res.should.have.status(401);
            res.body.should.have.property('auth').eql(false);
            done();
        });
    }).timeout(10000);

});

describe("get_wallets", () =>{

    it("when_get_all_wallets_is_called_with_proper_auth_then_success",(done) =>{
        chai.request(server)
        .get('/v1/wallets/wallets').set("x-access-token", access_token)
        .query({})
        .end((err,res) =>{
            res.should.have.status(200);
            res.body.should.have.property('success').eql(true);
            done();
        });
    }).timeout(10000);

});

describe("get_wallets", () =>{

    it("when_get_all_wallets_is_called_with_wrong_auth_then_return_401_and_auth_false",(done) =>{
        chai.request(server)
        .get('/v1/wallets/wallets')
        .set("x-access-token", fake_access_token)
        .query({})
        .end((err,res) =>{
            res.should.have.status(401);
            res.body.should.have.property('auth').eql(false);
            done();
        });
    }).timeout(10000);

});

describe("get_wallets", () =>{

    it("when_get_all_wallets_is_called_with_no_auth_then_return_401_and_auth_false",(done) =>{
        chai.request(server)
        .get('/v1/wallets/wallets')
        .query({})
        .end((err,res) =>{
            res.should.have.status(401);
            res.body.should.have.property('auth').eql(false);
            done();
        });
    }).timeout(10000);

});

