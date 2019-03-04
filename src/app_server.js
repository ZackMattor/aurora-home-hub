const WebSocketServer = require('websocket').server;
const http = require('http');
const EventEmitter = require('events');

module.exports = class AppServer extends EventEmitter {
  constructor() {
    super();

    var httpServer = http.createServer();

    httpServer.listen(8081);
    this.ws_server = new WebSocketServer({ httpServer: httpServer });
    this.ws_server.on('request', this.onRequest.bind(this));
  }

  onRequest(request) {
    console.log('Someone connected...');
    let connection = request.accept(null, request.origin);
    connection.on('message', this.onMessage.bind(this));
  }

  onMessage(message) {
    console.log('Message from client');

    let settings = JSON.parse(message['utf8Data']);
    console.log(settings);

    this.emit('change_settings', {
      device_name: 'iot_bookcase',
      animation_name: 'rainbow_scroll',
      settings: settings
    });
  }
};
