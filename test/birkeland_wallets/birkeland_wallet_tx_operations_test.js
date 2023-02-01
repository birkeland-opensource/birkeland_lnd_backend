let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');

chai.use(chaiHttp);

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVmZjQ1MjctODcyZi00NjkyLThhOWEtNzU5NzU4MDQ4NDEzIiwiZW1haWxfaWQiOiJiaXJrZWxhbmRAZ21haWwuY29tIiwiaWF0IjoxNjc1MjM4MzUxLCJleHAiOjE2NzUzMjQ3NTF9.tWYHcMWPpdnPm3ymDx3Ll5B2S8tX0peQAP73WKy2x1E"
const fake_access_token = "fake_access_token";
const date = new Date();

describe("all_transactions", () => {

    it("When_all_transactions_is_called_with_proper_auth_then_return_success", (done) => {
        chai.request(server)
            .post('/v1/wallets/all_transactions').set("x-access-token", access_token)
            .query({ user_id: "test_user_id", wallet_id : "wallet_id" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eql(true);
                done();
            });
    }).timeout(10000);

    it("When_all_transactions_is_called_with_fake_auth_then_return_401_auth_fail", (done) => {
        chai.request(server)
            .post('/v1/wallets/all_transactions').set("x-access-token", fake_access_token)
            .query({ user_id: "test_user_id", wallet_id : "wallet_id" })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('auth').eql(false);
                done();
            });
    }).timeout(10000);

});