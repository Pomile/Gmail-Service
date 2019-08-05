"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _googleapis = require("googleapis");

var _open = _interopRequireDefault(require("open"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsBase = require("js-base64");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _axios = _interopRequireDefault(require("axios"));

require("@babel/polyfill");

var _gService = _interopRequireDefault(require("../gService"));

var _generateToken = _interopRequireDefault(require("../helpers/generateToken"));

var _sendMessage = _interopRequireDefault(require("../helpers/sendMessage"));

var _getAccess = _interopRequireDefault(require("../helpers/getAccess"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var clientId = _gService["default"].clientId,
    redirectUris = _gService["default"].redirectUris;
var redirectUrl = redirectUris[0];
var clientSecret = 'tqbzFhBh-luLpFhikY72q_xi';
var oAuth2Client = new _googleapis.google.auth.OAuth2(clientId, clientSecret, redirectUrl);

var Gmail =
/*#__PURE__*/
function () {
  function Gmail() {
    _classCallCheck(this, Gmail);
  }

  _createClass(Gmail, null, [{
    key: "generateOAuthUrl",
    value: function () {
      var _generateOAuthUrl = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var scopes, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                scopes = ['https://www.googleapis.com/auth/gmail.send'];
                url = oAuth2Client.generateAuthUrl({
                  access_type: 'offline',
                  scope: scopes,
                  prompt: 'consent'
                });

                if (!(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development')) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return (0, _open["default"])(url);

              case 5:
                res.status(200).json({
                  status: 200,
                  url: url
                }).end();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateOAuthUrl(_x, _x2) {
        return _generateOAuthUrl.apply(this, arguments);
      }

      return generateOAuthUrl;
    }()
  }, {
    key: "getNewToken",
    value: function () {
      var _getNewToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var code;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                code = req.query.code;

                if (!(code === undefined || code === 'null' || code === '')) {
                  _context2.next = 5;
                  break;
                }

                res.status(400).json({
                  status: 400,
                  msg: 'authorization code is not defined'
                }).end();
                _context2.next = 7;
                break;

              case 5:
                _context2.next = 7;
                return (0, _generateToken["default"])(code, res, true);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getNewToken(_x3, _x4) {
        return _getNewToken.apply(this, arguments);
      }

      return getNewToken;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var auth, to, from, subject, message, email, gmail, base64EncodedEmail;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _getAccess["default"])(process.env.GOOGLE_REFRESH_TOKEN);

              case 2:
                auth = _context3.sent;

                if (auth.error) {
                  _context3.next = 16;
                  break;
                }

                oAuth2Client.setCredentials(auth);
                to = 'soft-sky@live.co.uk';
                from = 'ogedengbe123@gmail.com';
                subject = 'Testing Mail service';
                message = '<h1>Wow it works!!!</h1>';
                email = (0, _sendMessage["default"])(from, to, subject, message);
                gmail = _googleapis.google.gmail({
                  version: 'v1',
                  auth: oAuth2Client
                });
                base64EncodedEmail = _jsBase.Base64.encodeURI(email);
                _context3.next = 14;
                return gmail.users.messages.send({
                  userId: 'me',
                  resource: {
                    raw: base64EncodedEmail
                  }
                }, function (err, result) {
                  if (err) {
                    res.status(500).json({
                      status: 500,
                      error: 'Oops something went wrong',
                      sent: false
                    }).end();
                  } else {
                    res.status(200).json(_objectSpread({}, result.data, {
                      status: 200,
                      sent: true
                    })).end();
                  }
                });

              case 14:
                _context3.next = 17;
                break;

              case 16:
                res.status(443).json({
                  status: 443,
                  error: auth.error
                });

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function send(_x5, _x6) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "sendWithNodeMailer",
    value: function () {
      var _sendWithNodeMailer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var transporter;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // create reusable transporter object using the default SMTP transport
                transporter = _nodemailer["default"].createTransport({
                  service: 'gmail',
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  // true for 465, false for other ports
                  auth: {
                    user: process.env.GMAIL_ADDRESS,
                    // generated ethereal user
                    pass: process.env.GMAIL_PASS // generated ethereal password

                  }
                }); // send mail with defined transport object

                transporter.sendMail({
                  from: "\"Fred Foo \uD83D\uDC7B\" ".concat(process.env.GMAIL_ADDRESS),
                  // sender address
                  to: 'ogedengbe123@gmail.com, soft-sky@live.co.uk',
                  // list of receivers
                  subject: 'Hello ✔',
                  // Subject line
                  text: 'Hello world?',
                  // plain text body
                  html: '<b>Hello world?</b>' // html body

                }, function (error, response) {
                  if (error) {
                    return res.status(500).json({
                      msg: 'Ooops something went wrong'
                    });
                  }

                  return res.status(200).json(_objectSpread({}, response));
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function sendWithNodeMailer(_x7, _x8) {
        return _sendWithNodeMailer.apply(this, arguments);
      }

      return sendWithNodeMailer;
    }()
  }]);

  return Gmail;
}();

var _default = Gmail;
exports["default"] = _default;