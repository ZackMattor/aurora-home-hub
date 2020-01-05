// This class manages the Aurora Devices communicating with the
// animation server. They activate with the server which registers
// them as a Device. Then after they are registered we can start
// the animation for that device.

export class DeviceServer {
  constructor(mqtt_client, devices) {
    this.mqtt = mqtt_client;
    this.devices = devices;

    this.mqtt.subscribe('activate');
    this.mqtt.on('message', this.onDeviceMessage.bind(this));
    this.mqtt.publish('aurora_server_online', 'true');
  }

  onDeviceMessage(topic, msg) {
    let action = mqtt_actions[topic];
    action.call(this, msg);
  }
}

const mqtt_actions = {
  activate(msg) {
    let activate_info = JSON.parse(msg);
    this.devices.activateDevice(activate_info);
  },

  ping(msg) {
    console.log(ping);
  }
};
