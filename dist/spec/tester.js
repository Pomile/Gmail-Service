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
  });
});