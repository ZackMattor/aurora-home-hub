import { Device } from '../models/device.js';

export class DeviceStore {
  constructor() {
    this._devices = {};
  }

  ingestDeviceTelemetry(telemetry_packet, sendMsg) {
    let { device_id } = telemetry_packet;
    let device = this._devices[device_id];

    if(!device) {
      // Register device in the store
      device = new Device(device_id, sendMsg);
      this._devices[device_id] = device;
    }

    device.ingestDeviceTelemetry(telemetry_packet);
  }
}
