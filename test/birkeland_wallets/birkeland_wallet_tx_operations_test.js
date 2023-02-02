let chai = require('chai');
let chaiHttp = require('chai-http');
//const server = require('../../index');
const server = "http://localhost:9990";
const expect = chai.expect;

chai.use(chaiHttp);

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVmZjQ1MjctODcyZi00NjkyLThhOWEtNzU5NzU4MDQ4NDEzIiwiZW1haWxfaWQiOiJiaXJrZWxhbmRAZ21haWwuY29tIiwiaWF0IjoxNjc1MzAyNjA2LCJleHAiOjE2NzYxNjY2MDZ9.jyXQBayFsA7Svph7ponFYUHATIjqOYUdk_SSkhc54tk"
const fake_access_token = "fake_access_token";
const date = new Date();

var read_key = "f9746d02-e919-449e-8b86-286ccf55a95a";
var user_id = "b4670bfb-7199-43ce-92dc-a15d6a74311d";
var wallet_id = "317d7e9b-fc4c-4049-be90-ecda48b264c3";

describe("get_all_transactions", () => {

    it("test_base_endpoint", (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
                done();
            });
    }).timeout(10000);


    it("When_all_transactions_is_called_with_proper_auth_then_return_success", (done) => {
        chai.request(server)
            .post('/v1/wallets/all_transactions').set("x-access-token", access_token)
            .query({ user_id: "test_user_id", wallet_id: "wallet_id" })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
                done();
            });
    }).timeout(10000);

//     it("When_all_transactions_is_called_with_fake_auth_then_return_401_auth_fail", (done) => {
//         chai.request(server)
//             .post('/v1/wallets/all_transactions').set("x-access-token", fake_access_token)
//             .query({ user_id: "test_user_id", wallet_id: "wallet_id" })
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.have.property('auth').eql(false);
//                 done();
//             });
//     }).timeout(10000);

// });



// describe("get_get_onchain_address", () => {
//     it("when_get_on_chain_address_is_called_with_right_params_then_return_success", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_onchain_address').query({ user_id: "test_user_id", wallet_id: "wallet_id" }).end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.have.property('success').eql(true);
//                 done();
//             })

//     }).timeout(1000);

//     it("when_get_on_chain_address_is_called_with_right_missing _params_then_return_success_false", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_onchain_address').query({wallet_id: "wallet_id" }).end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.have.property('success').eql(false);
//                 done();
//             })

//     }).timeout(1000);

//     it("when_get_on_chain_address_is_called_with_right_missing _params_then_return_success_false", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_onchain_address').query({user_id: "user_id" }).end((err, res) => {
//                 res.should.have.status(400);
//                 res.body.should.have.property('success').eql(false);
//                 done();
//             })

//     }).timeout(1000);
// });



// describe("get_get_wallet_topup_tx", () => {
//     it("when_get_wallet_topup_tx_is_called_with_right_params_then_return_success_true", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_wallet_topup_tx').set("access-token", read_key)
//             .query({ user_id: user_id, wallet_id: wallet_id })
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.have.property('success').eql(true);
//                 done();
//             })

//     }).timeout(1000);

//     it("when_get_wallet_topup_tx_is_called_with_right_wrong_wallet_id_then_return_401_and_auth_fail", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_wallet_topup_tx').set("access-token", read_key)
//             .query({ user_id: user_id, wallet_id: "wallet_id" })
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.have.property('auth').eql(false);
//                 done();
//             })

//     }).timeout(1000);

//     it("when_get_wallet_topup_tx_is_called_with_right_wrong_read_key_then_return_401_and_auth_fail", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_wallet_topup_tx').set("access-token", read_key)
//             .query({ user_id: user_id, wallet_id: "wallet_id" })
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.body.should.have.property('auth').eql(false);
//                 done();
//             })

//     }).timeout(1000);

// });


// describe("create_invoice", () => {
//     it("when_create_invoice_is_called_with_right_params_then_return_success_true", (done) => {
//         chai.request(server)
//             .get('/v1/wallets/get_wallet_topup_tx').set("access-token", read_key)
//             .query({ user_id: user_id, wallet_id: wallet_id })
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.have.property('success').eql(true);
//                 done();
//             })

//     }).timeout(1000);

 });
