import { Animations } from '../animations.js';
import { Geometries } from '../geometries.js';

export class Device {
  constructor(device_id) {
    this._id = device_id;
    this._sendMsg = () => {};
    this._last_telemetry = (+new Date);
    this._geometry = null;
    this._animation = null;

    this._animation_state = {

    };

    console.log(`Device[${device_id}] -> Initialized!`);
  }

  set sendMsg(val) {
    this._sendMsg = val;
  }

  get geometry() {
    return this._geometry;
  }

  sendFrame(frame_data) {
    this._sendMsg(frame_data);
  }

  ingestDeviceTelemetry(device_telemetry) {
    const { geometry/* , geometry_params */ } = device_telemetry;

    this._geometry = Geometries[geometry];

    if(!this._animation) {
      this._animation = new Animations[geometry][0](this);
      this._animation.start();
    }

    this._last_telemetry = (+new Date);
  }

  get id() {
    return this._id;
  }
}
