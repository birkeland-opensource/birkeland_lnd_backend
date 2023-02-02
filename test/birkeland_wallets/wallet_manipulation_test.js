let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../index");
let should = chai.should();

chai.use(chaiHttp);

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjVmZjQ1MjctODcyZi00NjkyLThhOWEtNzU5NzU4MDQ4NDEzIiwiZW1haWxfaWQiOiJiaXJrZWxhbmRAZ21haWwuY29tIiwiaWF0IjoxNjc1MjM4MzUxLCJleHAiOjE2NzUzMjQ3NTF9.tWYHcMWPpdnPm3ymDx3Ll5B2S8tX0peQAP73WKy2x1E";
const fake_access_token = "fake_access_token";
const test_user_id = "test_user_id";
const date = new Date();

describe("create_wallet", () => {
  it("When create wallet is called with proper auth then success", (done) => {
    chai
      .request(server)
      .post("/v1/wallets/wallet")
      .set("x-access-token", access_token)
      .query({ user_id: test_user_id })
      .send({ wallet_name: `${date}-test_wallet` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").equal(true);
        done();
      });
  }).timeout(10000);

  it("When create wallet is called with fake auth then return 401 and auth false", (done) => {
    chai
      .request(server)
      .post("/v1/wallets/wallet")
      .set("x-access-token", fake_access_token)
      .query({ user_id: test_user_id })
      .send({ wallet_name: `${date}-test_wallet` })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth").equal(false);
        done();
      });
  }).timeout(10000);

  it("When create wallet is called with no auth then return 401 and auth false", (done) => {
    chai
      .request(server)
      .post("/v1/wallets/wallet")
      .query({ user_id: "" })
      .send({ wallet_name: `${date}-test_wallet` })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth").equal(false);
        done();
      });
  }).timeout(10000);
});

describe("get_all_wallets", () => {
  it("when get all wallets is called with proper auth then success", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallets")
      .set("x-access-token", access_token)
      .query({})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success").equal(true);
        done();
      });
  }).timeout(10000);

  it("when get all wallets is called with wrong auth then return 401 and auth false", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallets")
      .set("x-access-token", fake_access_token)
      .query({})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth").equal(false);
        done();
      });
  }).timeout(10000);

  it("when_get_all_wallets_is_called_with_no_auth_then_return_401_and_auth_false", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallets")
      .query({})
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth").eql(false);
        done();
      });
  }).timeout(10000);
});

describe("get_one_wallet", () => {
  it("when_get_one_wallet_is_called_with_right_auth_then_return_200_and_success_true", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallet")
      .set("x-access-token", access_token)
      .query({ user_id: "user_id", wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("success", true);
        done();
      });
  }).timeout(10000);

  it("when_get_one_wallet_is_called_with_no_auth_then_return_401_and_auth_false", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallet")
      .query({ user_id: "user_id", wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth", false);
        done();
      });
  }).timeout(10000);

  it("when_get_one_wallet_is_called_with_wrong_auth_then_return_401_and_auth_false", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallet")
      .set("x-access-token", fake_access_token)
      .query({ user_id: "user_id", wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("auth", false);
        done();
      });
  }).timeout(10000);

  it("when_get_one_wallet_is_called_with_insufficient_params_then_return_400_and_success_false", (done) => {
    chai
      .request(server)
      .get("/v1/wallets/wallet")
      .set("x-access-token", access_token)
      .query({ wallet_id: "wallet_id" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("success", false);
        done();
      });
  }).timeout(10000);
});
