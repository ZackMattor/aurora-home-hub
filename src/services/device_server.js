// This class manages the Aurora Devices communicating with the
// animation server. They activate with the server which registers
// them as a Device. Then after they are registered we can start
// the animation for that device.

import mqtt from 'mqtt';

const mqtt_actions = {
  activate(msg) {
    var device_name = msg.name;
    var device_size = msg.size;

    console.log(`${device_name} is trying to activate...`);
    // Logic to possibly fail activation...
    console.log(`${device_name} successfully activated!`);

    this.emit('new_device', {
      last_launched: Date.now(),
      name: device_name,
      size: device_size,
      client: this.client
    });
  },

  ping(msg) {
    console.log(ping);
  }
};

export class DeviceServer extends EventEmitter {
  constructor(mqtt_endpoint) {
    super();

    // MQTT and animation loops
    this.mqtt = mqtt.connect(mqtt_endpoint);

    this.mqtt.on('message', this.onDeviceMessage.bind(this));
    this.mqtt.publish('aurora_server_online', 'true');
  }

  onDeviceMessage(topic, msg) {
    let action = mqtt_actions[topic];
    action.call(this, msg);
  }
}
