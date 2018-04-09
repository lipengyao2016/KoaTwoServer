#!/usr/bin/env node

/**
 * Module dependencies.
 */

var config = require('./config/config');
// if (process.version < config.node_low_version) {
//   console.log("node version is too low!");
//   process.exit(1);
// }
// if (process.version > config.node_high_version) {
//   console.log("node version is too high!");
//   process.exit(1);
// }

var app = require('./app');
const http = require('http');
let server_name = 'memberCard Server';

let port = normalizePort(process.env.PORT || config.server_port || '3000');

/**
 * Create HTTP server.
 */
var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
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
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr

    : 'port ' + addr.port;
  console.log(`${server_name} listening on ${bind}`);
}