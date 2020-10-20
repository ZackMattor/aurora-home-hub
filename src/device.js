import { Animations } from './animations';

export class Device {
  constructor(device_id, sendMsg) {
    this._id = device_id;
    this._sendMsg = sendMsg;
    this._last_telemetry = (+new Date);
    this._geometry = null;
    this._animation = null;

    console.log(`Device[${device_id}] -> Initialized!`);
  }

  ingestDeviceTelemetry(device_telemetry) {
    console.log(device_telemetry);
    const { geometry, geometry_params } = device_telemetry;

    this._geometry = geometry;

    if(!this._animation) {
      this._animation = new Animations[geometry][0](this._sendMsg);
      console.log(this._animation);
      this._animation.start();
    }

    this._last_telemetry = (+new Date);
  }

  get id() {
    return this._id;
  }
}
