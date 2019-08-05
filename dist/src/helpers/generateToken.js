"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _googleapis = require("googleapis");

var _gService = _interopRequireDefault(require("../gService"));

var _tokenStore = _interopRequireDefault(require("./tokenStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var clientId = _gService["default"].clientId,
    redirectUris = _gService["default"].redirectUris;
var redirectUrl = redirectUris[0];
var clientSecret = 'tqbzFhBh-luLpFhikY72q_xi';
var oAuth2Client = new _googleapis.google.auth.OAuth2(clientId, clientSecret, redirectUrl);

var generateNewToken =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(code, res, sendResponse) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", oAuth2Client.getToken(code, function (err, token) {
              if (err) {
                res.status(401).json({
                  status: 401,
                  msg: err.message
                }).end();
              } else {
                oAuth2Client.setCredentials(token); // Store the token to env

                (0, _tokenStore["default"])(token);

                if (sendResponse) {
                  res.status(200).json({
                    token: token,
                    success: true
                  }).end();
                } else {
                  res.redirect('http://localhost:8000/api/v1/gmail/send');
                }
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateNewToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = generateNewToken;
exports["default"] = _default;