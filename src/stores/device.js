import { Device } from '../models/device.js';
import { AbstractStore } from './abstract_store.js';

export class DeviceStore extends AbstractStore {
  ingestDeviceTelemetry(telemetry_packet, sendMsg) {
    let { device_id, geometry } = telemetry_packet;
    let device = this._items[device_id];

    if(!device) {
      device = this.add(new Device(device_id, {
        sendMsg: sendMsg,
        geometry_name: geometry,
      }));
    }

    device.ingestDeviceTelemetry(telemetry_packet);
  }
}
