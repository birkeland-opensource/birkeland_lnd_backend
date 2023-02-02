let chai = require("chai");
let chaiHttp = require("chai-http");
//const server = require('../../index');
const server = "http://10.2.210.218:9990";
const expect = chai.expect;

var payment_request = ""

chai.use(chaiHttp);

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVmZjQ1MjctODcyZi00NjkyLThhOWEtNzU5NzU4MDQ4NDEzIiwiZW1haWxfaWQiOiJiaXJrZWxhbmRAZ21haWwuY29tIiwiaWF0IjoxNjc1MzAyNjA2LCJleHAiOjE2NzYxNjY2MDZ9.jyXQBayFsA7Svph7ponFYUHATIjqOYUdk_SSkhc54tk";
const fake_access_token = "fake_access_token";
const date = new Date();

var read_key = "f9746d02-e919-449e-8b86-286ccf55a95a";
var user_id = "b4670bfb-7199-43ce-92dc-a15d6a74311d";
var wallet_id = "317d7e9b-fc4c-4049-be90-ecda48b264c3";

describe("get_all_transactions", () => {
  it("test_base_endpoint", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  }).timeout(10000);

  it("When_all_transactions_is_called_with_proper_auth_then_return_success", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/all_transactions")
      .set("x-access-token", access_token)
      .query({ user_id: "test_user_id", wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  }).timeout(10000);

  it("When_all_transactions_is_called_with_fake_auth_then_return_401_auth_fail", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/all_transactions")
      .set("x-access-token", fake_access_token)
      .query({ user_id: "test_user_id", wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth").eql(false);
        done();
      });
  }).timeout(10000);
});

describe("get_get_onchain_address", () => {
  it("when_get_on_chain_address_is_called_with_right_params_then_return_success", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/get_onchain_address")
      .query({ user_id: "test_user_id", wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").eql(true);
        done();
      });
  }).timeout(1000);

  it("when_get_on_chain_address_is_called_with_missing_user_id_params_then_return_success_fail", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/get_onchain_address")
      .query({ wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success").eql(false);
        done();
      });
  }).timeout(1000);

  it("when_get_on_chain_address_is_called_with_missing_wallet_id_params_then_return_success_fail", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/get_onchain_address")
      .query({ user_id: "user_id" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success").eql(false);
        done();
      });
  }).timeout(1000);
});

describe("get_get_wallet_topup_tx", () => {
  it("when_get_wallet_topup_tx_is_called_with_right_params_then_return_success_true", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/get_wallet_topup_tx")
      .set("access-token", read_key)
      .query({ user_id: user_id, wallet_id: wallet_id })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  }).timeout(1000);

  it("when_get_wallet_topup_tx_is_called_with_right_wrong_wallet_id_then_return_401_and_auth_fail", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/get_wallet_topup_tx")
      .set("access-token", read_key)
      .query({ user_id: user_id, wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body.auth).to.equal(false);
        done();
      });
  }).timeout(1000);

  it("when_get_wallet_topup_tx_is_called_with_right_wrong_read_key_then_return_401_and_auth_fail", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/get_wallet_topup_tx")
      .set("access-token", "wrong_read_key")
      .query({ user_id: user_id, wallet_id: wallet_id })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body.auth).to.equal(false);
        done();
      });
  }).timeout(1000);
});

describe("create_invoice", () => {

    it("when_create_invoice_is_called_with_right_params_then_return_success_true", (done) => {
        chai.request(server)
        .post('/v1/wallets/create_invoice').set("access-token", read_key)
        .query({ user_id: user_id, wallet_id: wallet_id })
        .send({memo : `test memo ${date}`, "sats" : 1000})
        .end((err, res) => {
        let resp = res.body.message;
        payment_request = resp["message"]["request"]
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').to.equal(true);
        done();
        })       
}).timeout(1000);

it("when_create_invoice_is_called_with_wrong_read_key_then_return_auth_fail", (done) => {
    chai.request(server)
    .post('/v1/wallets/create_invoice').set("access-token", "read_key")
    .query({ user_id: user_id, wallet_id: wallet_id })
    .send({memo : `test memo ${date}`, "sats" : 1000})
    .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('auth').to.equal(false);
    done();
    })       
}).timeout(1000);

it("when_create_invoice_is_called_with_missing_param_then_return_success_false", (done) => {
    chai.request(server)
    .post('/v1/wallets/create_invoice').set("access-token", read_key)
    .query({ wallet_id: wallet_id })
    .send({memo : `test memo ${date}`, "sats" : 1000})
    .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    done();
    })       
}).timeout(1000);

it("when_create_invoice_is_called_with_missing_body_param_then_return_success_false", (done) => {
    chai.request(server)
    .post('/v1/wallets/create_invoice').set("access-token", read_key)
    .query({ wallet_id: wallet_id,wallet_id: wallet_id })
    .send({"sats" : 1000})
    .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    done();
    })       
}).timeout(1000);



});



describe("post_make_a_payment", () => {

    it("when_make_payment_is_called_with_wrong_read_key_then_return_auth_fail", (done) => {
        chai.request(server)
        .post('/v1/wallets/make_a_payment').set("access-token", "read_key")
        .query({ user_id: user_id, wallet_id: wallet_id })
        .send({memo : `test memo ${date}`, "sats" : 1000})
        .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('auth').to.equal(false);
        done();
        })       
}).timeout(1000);

    it("when_make_payment_is_called_with_right_params_then_return_success_true", (done) => {
        chai.request(server)
        .post('/v1/wallets/make_a_payment').set("access-token", read_key)
        .query({ user_id: user_id, wallet_id: wallet_id })
        .send({memo : `test memo ${date}`, "sats" : 1000})
        .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('success').to.equal(false);
        done();
        })       
}).timeout(1000);

it("when_make_payment_is_called_with_wrong_request_hash_then_return_success_false", (done) => {
    chai.request(server)
    .post('/v1/wallets/make_a_payment').set("access-token", read_key)
    .query({ user_id: user_id, wallet_id: wallet_id })
    .send({request_hash : "request_hash"})
    .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('success').to.equal(false);
    done();
    })       
}).timeout(1000);


it("when_make_payment_is_called_with_right_params_then_return_success_true", (done) => {
    chai.request(server)
    .post('/v1/wallets/make_a_payment').set("access-token", read_key)
    .query({ user_id: user_id, wallet_id: wallet_id })
    .send({request_hash : payment_request})
    .end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success').to.equal(true);
    done();
    })       
}).timeout(1000);



});


describe("get_decode_lightning_invoice", () => {
  it("when_decode_lightning_invoice_is_called_without_payment_hash_then_return fail", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/decode_lightning_invoice")
      .query({ payment_hash: "payment_hash"})
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
        done();
      });
  }).timeout(1000);


    it("when_decode_lightning_invoice_is_called_without_payment_hash_then_return fail", (done) => {
      chai
        .request(server)
        .get("/v1/wallets/decode_lightning_invoice")
        .query({ payment_hash: payment_request})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    }).timeout(1000);
});