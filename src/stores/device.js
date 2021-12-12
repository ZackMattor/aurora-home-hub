import { Device } from '../models/device.js';
import { AbstractStore } from './abstract_store.js';

export class DeviceStore extends AbstractStore {
  ingestDeviceActivate(activate_packet, sendMsg) {
    let { device_id, geometry, output_type } = activate_packet;
    let device = this.find(device_id);

    if(!device) {
      device = this.add(new Device(device_id, {
        geometry_name: geometry,
        output_type
      }));

      device.on('stateChange', () => this.emit('stateChange', this.serializeState()));
    }

    device.sendMsg = sendMsg;

    device.ingestDeviceActivate(activate_packet);
  }

  serializeState() {
    let data = {};

    for(const item of Object.values(this._items)) {
      data[item.id] = item.inputState;
    }

    return data;
  }

  setScenes(scenes, deviceState) {
    for(const scene of scenes) {
      for(const deviceId in scene) {
        this.find(deviceId)?.setAnimation(...scene[deviceId], deviceState);
      }
    }
  }

  processDataBindings(deviceState) {
    for(const deviceId in deviceState) {
      this.find(deviceId)?.processDataBindings(deviceState);
    }
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
