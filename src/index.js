var mqtt = require('mqtt');
var http = require('http');
var WebSocketServer = require('websocket').server;

var AnimationClasses = require('./animations/index.js');

let animator = {
  init() {
    let desired_animation = 'rainbow_scroll';

    this.devices = {
      'zack_bookcase' : {
        size: { width: 20, height: 5 },
        animations: ['rainbow_scroll', 'color_ladder', 'snowfall'],
        active_animation: null
      }
    };

    // MQTT and animation loops
    this.client = mqtt.connect('mqtt://mqtt.zackmattor.com:1883');

    this.client.on('connect', () => {
      console.log('Connected over MQTT!');

      // Firmware doesn't support activation yet...
      // so this line just mocks it in
      this.onDeviceMessage('activate', 'zack_bookcase');
    });

    this.client.on('message', this.onDeviceMessage.bind(this));
  },

  onDeviceMessage(topic, msg) {
    switch(topic) {
      case 'activate':
        let device_name = msg;
        let device = this.devices[device_name];

        console.log(`${device_name} is trying to activate...`);

        if(!device) {
          console.log(`Failed to activate ${device_name}`);
          return;
        }

        console.log(`${device_name} successfully activated!`);

        device.active_animation = new AnimationClasses[device.animations[0]](device.size);

        device.active_animation.start((frame) => {
          this.client.publish('ff', frame);
        });
      break;
    }
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
