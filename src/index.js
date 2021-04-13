import { DeviceServer } from './services/device_server.js';
import { AppServer } from './services/app_server.js';

import { DeviceStore } from './stores/device.js';

const MQTT_SERVER_URL = process.env.MQTT_SERVER_URL || 'mqtt://127.0.0.1';

const deviceStore = new DeviceStore();

const appServer = new AppServer(deviceStore);
const deviceServer = new DeviceServer(deviceStore);

appServer.listen();
deviceServer.listen();
