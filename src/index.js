import { DeviceConnService } from './services/device_conn';
import { ServerConnService } from './services/server_conn';

import { DeviceStore } from './stores/device';

const MQTT_SERVER_URL = process.env.MQTT_SERVER_URL || 'mqtt://127.0.0.1';
const API_KEY = process.env.AURORA_HUB_API_KEY || 'API_KEY';
const SERVER_URL = process.env.AURORA_SERVER_URL || 'https://aurora.example.com';

const serverConn = new ServerConnService(SERVER_URL, API_KEY);
const devices = new DeviceStore(serverConn);
const deviceConn = new DeviceConnService(MQTT_SERVER_URL, devices);

deviceConn.listen();
serverConn.listen();
