import { Animations } from '../animations.js';
import { Geometries } from '../geometries.js';

export class Device {
  constructor(device_id, params) {
    console.log(`Device[${device_id}] -> Created!`);

    let {
      geometry_name
    } = params;

    this._id = device_id;
    this._sendMsg = () => {};
    this._geometry = Geometries[geometry_name];
    this._animation = null;

    this._last_telemetry = (+new Date);
    this._connected_at = (+new Date);

    if(this.geometry) {
      this.setAnimation('HueWalker');
    } else {
      console.error(`Device[${this.id}] -> Invalid geometry (${th})`);
    }
  }

  serialize() {
    return {
      id: this._id,
      last_telemetry: this._last_telemetry,
      connected_at: this._connected_at,
      geometry_name: this._geometry?.name,
      current_animation_name: this._animation?.name,
    };
  }

  set sendMsg(val) {
    this._sendMsg = val;
  }

  get geometry() {
    return this._geometry;
  }

  get animation() {
    return this._animation;
  }

  setAnimation(name) {
    this._animation = new Animations[name](this);
    this._animation.start();
  }

  sendFrame(frame_data) {
    this._sendMsg(frame_data);
  }

  ingestDeviceTelemetry(_device_telemetry) {
    // const { _ } = device_telemetry;

    this._last_telemetry = (+new Date);
  }

  get id() {
    return this._id;
  }
}
