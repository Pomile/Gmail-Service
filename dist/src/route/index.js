"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _gmail = _interopRequireDefault(require("../controller/gmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import controllers and helpers and use it in your route handlers
var routes = _express["default"].Router();

routes.get('/test', function (req, res) {
  res.status(200).json({
    status: 200,
    msg: 'Route module is working perfectly'
  }).end();
});
routes.get('/oauth2callback', _gmail["default"].getNewToken);
routes.get('/oauth/url', _gmail["default"].generateOAuthUrl);
routes.post('/gmail/send', _gmail["default"].send);
routes.post('/nodemailer/send', _gmail["default"].sendWithNodeMailer);
var _default = routes;
exports["default"] = _default;