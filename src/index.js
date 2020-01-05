import dotenv from 'dotenv';
dotenv.config();

import mqtt from 'mqtt';
import { DeviceServer } from './services/device_server';
import { Devices } from './devices';
//import AnimationClasses from './animations/index';
//import { AppServer } from './app_server';

const mqtt_endpoint = process.env.MQTT_ENDPOINT || 'mqtt://localhost:1883';
const mqtt_client = mqtt.connect(mqtt_endpoint);
const devices = new Devices(mqtt_client);

let device_server = new DeviceServer(mqtt_client, devices);
//let app_server = new AppServer();

//device_server.on('new_device', (device) => {
//  console.log('NEW DEVICE CONNECTEd');
//
//  devices[device.name] = device;
//
//  device.active_animation = new AnimationClasses.rainbow_scroll(device.size);
//  device.active_animation.start((frame) => {
//    // TODO - Make this publish based on ID
//    device.client.publish('ff', frame);
//  });
//});

//app_server.on('change_settings', (data) => {
//  this.devices[data.device_name].animations[data.animation_name].setNormalizedConfig(data.settings);
//});
