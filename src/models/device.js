import { Animations } from '../animations.js';
import { Geometries } from '../geometries.js';
import EventEmitter from 'events';

export class Device extends EventEmitter {
  constructor(device_id, params) {
    super();

    console.log(`Device[${device_id}] -> Created!`);

    let {
      geometry_name,
      output_type
    } = params;

    this._id = device_id;
    this._sendMsg = () => {};
    this._geometry = Geometries[geometry_name || 'shard'];
    this._animation = null;
    this._inputState = {};

    this._last_telemetry = (+new Date);
    this._connected_at = (+new Date);

    if(output_type === 1) {
      this.setAnimation('HueWalker');
    } else if(this.geometry) {
      this.setAnimation('HueWalker');
    } else {
      console.error(`Device[${this.id}] -> Invalid geometry (${geometry_name})`);
    }
  }

  serialize() {
    return {
      id: this._id,
      last_telemetry: this._last_telemetry,
      connected_at: this._connected_at,
      geometry_name: this._geometry?.name,
      animation_name: this._animation?.name,
    };
  }

  get inputState() {
    return this._inputState;
  }

  set inputState(val) {
    this._inputState = Object.assign(this._inputState, val);
    this.emit('stateChange', val);
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

  setAnimation(name, config={}) {
    if(this.animation) {
      this.animation.stop();
    }

    this._animation = new (Animations.find(name))(this);

    for(const key in config) {
      this._animation.setConfig(key, config[key]);
    }

    this.animation.start();
    console.log('Starting animation', name);
  }

  sendFrame(frame_data) {
    this._sendMsg(frame_data);
  }

  ingestDeviceActivate( /* activate_packet */ ) {
    // const { _ } = activate_packet;
  }

  ingestDeviceTelemetry(telemetry_packet) {
    const { input_state } = telemetry_packet;

    this.inputState = input_state;

    this._last_telemetry = (+new Date);
  }

  get id() {
    return this._id;
  }
}
