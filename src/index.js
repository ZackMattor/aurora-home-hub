var mqtt = require('mqtt');
var http = require('http');
var WebSocketServer = require('websocket').server;
var AnimationClasses = require('./animations/index.js');

let animator = {
  client: null,
  devices: {},

  init() {
    // MQTT and animation loops
    this.client = mqtt.connect('mqtt://mqtt.zackmattor.com:1883');

    this.client.on('connect', () => {
      console.log('Connected over MQTT!');

      // Firmware doesn't support activation yet...
      // so this line just mocks it in for the bookcase
      this.onDeviceMessage('activate', {
        name: 'zack_bookcase',
        id: '12345678',
        size: { width: 20, height: 5 }
      });
    });

    this.client.on('message', this.onDeviceMessage.bind(this));
    this.client.publish('aurora_server_online', 'true');
  },

  onDeviceMessage(topic, msg) {
    switch(topic) {
    case 'activate':
      var device_name = msg.name;
      var device_size = msg.size;

      console.log(`${device_name} is trying to activate...`);

      // Logic to possibly fail activation...
      // if(!device) {
      //   console.log(`Failed to activate ${device_name}`);
      //   return;
      // }

      console.log(`${device_name} successfully activated!`);

      // TODO - make a device class
      this.devices[device_name] = {
        last_launched: Date.now(),
        name: device_name,
        size: device_size,
        active_animation: new AnimationClasses.rainbow_scroll(device_size),
      };

      this.devices[device_name].active_animation.start((frame) => {
        // TODO - Make this publish based on ID
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
