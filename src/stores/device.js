import { Device } from '../models/device.js';
import { AbstractStore } from './abstract_store.js';

export class DeviceStore extends AbstractStore {
  ingestDeviceTelemetry(telemetry_packet, sendMsg) {
    let { device_id } = telemetry_packet;
    let device = this._items[device_id];

    if(!device) {
      // Register device in the store
      device = new Device(device_id);
      this._items[device_id] = device;
    }

    device.sendMsg = sendMsg;

    device.ingestDeviceTelemetry(telemetry_packet);
  }
}
