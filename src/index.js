import { DeviceServer } from './services/device_server';
import { AppServer } from './services/app_server';

import { DeviceStore } from './stores/device';

const MQTT_SERVER_URL = process.env.MQTT_SERVER_URL || 'mqtt://127.0.0.1';
const API_KEY = process.env.AURORA_HUB_API_KEY || 'API_KEY';
const SERVER_URL = process.env.AURORA_SERVER_URL || 'https://aurora.example.com';

const deviceStore = new DeviceStore();

const appServer = new AppServer(SERVER_URL, API_KEY);
const deviceServer = new DeviceServer(MQTT_SERVER_URL, deviceStore);

appServer.listen();
deviceServer.listen();
