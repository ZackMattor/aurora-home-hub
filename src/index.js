import dotenv from 'dotenv';
dotenv.config();

import AnimationClasses from './animations/index';
import { AppServer } from './app_server';
import { DeviceServer } from './device_server';

let devices = [];

const mqtt_endpoint = process.env.MQTT_ENDPOINT || 'mqtt://localhost:1883';

let device_server = new DeviceServer(mqtt_endpoint);
let app_server = new AppServer();

device_server.on('new_device', (device) => {
  console.log('NEW DEVICE CONNECTEd');

  devices[device.name] = device;

  device.active_animation = new AnimationClasses.rainbow_scroll(device.size);
  device.active_animation.start((frame) => {
    // TODO - Make this publish based on ID
    device.client.publish('ff', frame);
  });
});

app_server.on('change_settings', (data) => {
  this.devices[data.device_name].animations[data.animation_name].setNormalizedConfig(data.settings);
});
