var mqtt = require('mqtt');
var WebSocketServer = require('websocket').server;
var http = require('http');

var animation_classes = require('./animations/index.js');
// @TODO - Implement devices
//var devices = require('./devices/index.js');

let animator = {
  init() {
    let desired_animation = 'rainbow_scroll';

    this.devices = {
      'iot_bookcase' : {
        animations: {}
      }
    };

    for(let name in animation_classes) {
      this.devices['iot_bookcase'].animations[name] = new animation_classes[name]();
      this.devices['iot_bookcase'].animations[name].start();
    }

    // MQTT and animation loops
    var client = mqtt.connect('mqtt://mqtt.zackmattor.com:1883');
    client.on('connect', () => {
      console.log('mqtt connected!');
      let animation = this.devices['iot_bookcase'].animations[desired_animation];

      setInterval(() => {
        client.publish('ff', animation.render());
      }, animation.interval);
    });
  },

  setNormalizedConfig(device_name, animation_name, cfg) {
    this.devices[device_name].animations[animation_name].setNormalizedConfig(cfg);
  }
};

let server = {
  init() {
    var httpServer = http.createServer();

    httpServer.listen(8081);
    this.ws_server = new WebSocketServer({ httpServer: httpServer });
    this.ws_server.on('request', this.onRequest.bind(this));
  },

  onRequest(request) {
    console.log('Someone connected...');
    let connection = request.accept(null, request.origin);
    connection.on('message', this.onMessage.bind(this));
  },

  onMessage(message) {
    console.log('Message from client');

    let settings = JSON.parse(message['utf8Data']);
    console.log(settings);
    animator.setNormalizedConfig('iot_bookcase', 'rainbow_scroll', settings);
  }
};

server.init();
animator.init();
