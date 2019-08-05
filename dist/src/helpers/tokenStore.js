"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var storeToken = function storeToken(token) {
  process.env.GOOGLE_ACCESS_TOKEN = token.access_token;
  process.env.GOOGLE_REFRESH_TOKEN = token.refresh_token;
  process.env.GOOGLE_EXPIRY = token.expiry_date;
  process.env.GOOGLE_SCOPE = token.scope;
  process.env.GOOGLE_TOKEN_TYPE = token.token_type;
};

var _default = storeToken;
exports["default"] = _default;