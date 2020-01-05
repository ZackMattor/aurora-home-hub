import { Device } from './device';

const log = (...args) => {
  console.log("Devices >>", ...args);
};

export class Devices {
  constructor(mqtt_client) {
    this.mqtt = mqtt_client;
    this.devices = [];
  }

  activateDevice(device_data) {
    log("Activating device", device_data);
    var device = this.devices.find((dev) => dev.id == device_data.id);
    
    if(!device) {
      log('First time device activation!');
      device = new Device(this.mqtt);
      this.devices.push(device);
    }

    device.activate(device_data);
    log(this.devices.length);
  }
}
