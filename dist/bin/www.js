"use strict";

var _http = _interopRequireDefault(require("http"));

var _index = _interopRequireDefault(require("../index"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = _http["default"].createServer(_index["default"]);
/**
 * Normalize a port into a number, string, or false.
 */


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (typeof port === 'number' && port >= 0) {
    // named pipe
    return port;
  }

  return false;
}
/**
 * Get port from environment and store in Express.
 */


var port = normalizePort(process.env.PORT || '3000');

_index["default"].set('port', port);
/**
 * Event listener for HTTP server "error" event.
 */


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? "Pipe ".concat(port) : "Port ".concat(port); // handle specific listen errors with friendly messages

  switch (error.code) {
    case 'EACCES':
      console.log("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.log("".concat(bind, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */


function onListening() {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    console.log("Server is listening on http://localhost:".concat(port, "/"));
  }
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);