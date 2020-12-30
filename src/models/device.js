import { Animations } from '../animations';
import { Geometries } from '../geometries';

export class Device {
  constructor(device_id, sendMsg) {
    this._id = device_id;
    this._sendMsg = sendMsg;
    this._last_telemetry = (+new Date);
    this._geometry = null;
    this._animation = null;

    this._animation_state = {

    };

    console.log(`Device[${device_id}] -> Initialized!`);
  }

  get geometry() {
    return this._geometry;
  }

  sendFrame(frame_data) {
    this._sendMsg('ff', frame_data);
  }

  ingestDeviceTelemetry(device_telemetry) {
    console.log(device_telemetry);
    const { geometry, geometry_params } = device_telemetry;

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
