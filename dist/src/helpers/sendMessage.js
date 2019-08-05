"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function buildMessage(from, to, subject, message) {
  var str = ['Content-type: text/html;charset=iso-8859-1\n', 'MIME-Version: 1.0\n', 'Content-Transfer-Encoding: 7bit\n', 'to: ', to, '\n', 'from: ', from, '\n', 'subject: ', subject, '\n\n', "".concat(message)].join(''); // Compose Gmail message and send immediately

  return str;
}

var _default = buildMessage;
exports["default"] = _default;