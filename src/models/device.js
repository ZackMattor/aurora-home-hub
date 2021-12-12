import { Animations } from '../animations.js';
import { Geometries } from '../geometries.js';
import EventEmitter from 'events';

function findDeviceDataValue(inputPath, data) {
  let [devId, inputName] = inputPath.split('.');

  return data[devId] && data[devId][inputName] && parseInt(data[devId][inputName]);
}

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

    // {
    //   input - The path to find the input data that we bind to. Ex. fe:fe:fe:fe:fe.pot
    //   map_val - the range of the value so we can normalize it 0-1
    //   config_key - The config key that this input is bound to
    //   default - The default value if the input doesn't exist in the state
    // }
    this._dataBindings = [];

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

  processDataBindings(data) {
    console.log('processing data bindings... ', data);

    for(const binding of this._dataBindings) {
      const foundData = findDeviceDataValue(binding.input, data);

      if(typeof foundData !== 'undefined') {
        console.log(foundData, binding.map_val);
        const processedData = foundData / binding.map_val;
        console.log('found data to bind', processedData);
        this._animation.setConfig(binding.config_key, processedData);
      } else {
        this._animation.setConfig(binding.config_key, binding.default);
      }
    }
  }

  setAnimation(name, config={}, devicesState=null) {
    if(this.animation) {
      this.animation.stop();
    }

    this._animation = new (Animations.find(name))(this);

    this._dataBindings = [];

    for(const key in config) {
      console.log(config[key]);

      // Determine if a config value for our scene is a data-bound value to another input
      if(typeof config[key] === 'string' && config[key].indexOf('bind(') !== -1) {
        let matches = config[key].match(/bind\((?<input>.+),(?<map_val>.+),(?<default>.+)\)/);

        // Register our data binding
        this._dataBindings.push({
          input: matches.groups.input,
          map_val: parseInt(matches.groups.map_val),
          default: parseInt(matches.groups.default),
          config_key: key
        });
      } else {
        this._animation.setConfig(key, config[key]);
      }
    }

    if(devicesState) {
      console.log('TRYING TO SET DATA BINDINGS');
      this.processDataBindings(devicesState);
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
