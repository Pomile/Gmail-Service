"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _chai = _interopRequireDefault(require("chai"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('TEST SUITE', function () {
  describe('GET /test', function () {
    it('should test route', function (done) {
      (0, _supertest["default"])(_index["default"]).get('/api/v1/test').set('Accept', 'application/json').expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Route module is working perfectly');
        done();
      });
    });
    it('should generate google OAuth URL', function (done) {
      (0, _supertest["default"])(_index["default"]).get('/api/v1/oauth/url').set('Accept', 'application/json').expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('url');
        done();
      });
    });
    it('should not generate new token without authorization code', function (done) {
      (0, _supertest["default"])(_index["default"]).get('/api/v1/oauth2callback').set('Accept', 'application/json').expect(400).end(function (err, res) {
        if (err) return done(err);
        expect(res.body.msg).to.equal('authorization code is not defined');
        done();
      });
    });
    it('should not generate new token with invalid authorization code', function (done) {
      (0, _supertest["default"])(_index["default"]).get('/api/v1/oauth2callback?code=1/hjghgsgsrstyrwtywrtfnb').set('Accept', 'application/json').expect(401).end(function (err, res) {
        if (err) return done(err);
        expect(res.body.msg).to.equal('invalid_grant');
        done();
      });
    });
    it('should send a mail with gmail client', function (done) {
      (0, _supertest["default"])(_index["default"]).post('/api/v1/gmail/send').set('Accept', 'application/json').expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.body.sent).to.equal(true);
        done();
      });
    });
    it('should send a mail with nodemailer client', function (done) {
      (0, _supertest["default"])(_index["default"]).post('/api/v1/nodemailer/send').set('Accept', 'application/json').expect(200).end(function (err, res) {
        if (err) return done(err);
        expect(res.body.sent).to.equal(true);
        done();
      });
    });
  });
});