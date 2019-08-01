"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./src/route/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('short'));
app.use(_bodyParser["default"].urlencoded({
  extended: false,
  type: '*/x-www-form-urlencoded'
}));
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));
app.use(_bodyParser["default"].text({
  type: 'text/html'
}));
app.use(_bodyParser["default"].text({
  type: 'text/plain'
}));
app.use(_bodyParser["default"].raw({
  type: '*/octet-stream'
}));
app.get('/', function (req, res) {
  return res.status(200).send('<h1 style="color: blue;">Express Server Setup!</h1><p>Welcome home!</p>');
});
app.use('/api/v1/', _index["default"]);
app.all('*', function (req, res) {
  res.status(404).json({
    status: 404,
    msg: 'NOT FOUND'
  });
});
var _default = app;
exports["default"] = _default;