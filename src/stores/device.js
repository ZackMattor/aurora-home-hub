import { Device } from '../models/device.js';
import { AbstractStore } from './abstract_store.js';

export class DeviceStore extends AbstractStore {
  ingestDeviceActivate(activate_packet, sendMsg) {
    let { device_id, geometry } = activate_packet;
    let device = this.find(device_id);

    if(!device) {
      device = this.add(new Device(device_id, {
        geometry_name: geometry,
      }));
    }

    device.sendMsg = sendMsg;

    device.ingestDeviceActivate(activate_packet);
  }

  ingestDeviceTelemetry(telemetry_packet) {
    let { device_id } = telemetry_packet;
    let device = this.find(device_id);

    if(device) {
      device.ingestDeviceTelemetry(telemetry_packet);
    } else {
      console.log(`ERORR - No device found for device telemetry ${device_id}`);
    }
  }
}
