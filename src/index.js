import { DeviceServer } from './services/device_server.js';
import { AppServer } from './services/app_server.js';
import { DeviceStore } from './stores/device.js';
import { Operator } from './operator.js';
import fs from 'fs';

const deviceStore = new DeviceStore();
const appServer = new AppServer(deviceStore);
const deviceServer = new DeviceServer(deviceStore);

appServer.listen();
deviceServer.listen();

const op = new Operator();

op.importYaml(fs.readFileSync('triggers/noyes.yaml'), 'utf8');

deviceStore.on('stateChange', deviceState => {
  const scenes = op.process(deviceState);

  deviceStore.setScenes(scenes);
});

