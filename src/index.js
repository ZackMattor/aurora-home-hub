import { DeviceServer } from './services/device_server.js';
import { AppServer } from './services/app_server.js';
import { DeviceStore } from './stores/device.js';
import { Operator } from './operator.js';

const deviceStore = new DeviceStore();
const appServer = new AppServer(deviceStore);
const deviceServer = new DeviceServer(deviceStore);

appServer.listen();
deviceServer.listen();

//
// Set up a bunch of triggers for scenes
//
// TODO - only trigger on state change?
//
const op = new Operator();

// op.addTrigger({
//   'var': '7C:9E:BD:ED:9B:24.right'
// }, {
//   '7C:9E:BD:F4:37:9C': ['RawColor', { r: 1, g: 0, b: 0 }],
//   '7C:9E:BD:ED:9B:24': ['RawColor', { r: 1, g: 0, b: 0 }],
//   '7C:9E:BD:ED:04:64': ['RawColor', { r: 1 }],
// }/* , {
//   '7C:9E:BD:F4:37:9C': ['RawColor', { brightness: 0}]
// }*/);
// 
// op.addTrigger({
//   'var': '7C:9E:BD:ED:9B:24.left'
// }, {
//   '7C:9E:BD:F4:37:9C': ['RawColor', { r: 0, g: 1, b: 0 }],
//   '7C:9E:BD:ED:9B:24': ['RawColor', { r: 0.5 }],
//   '7C:9E:BD:ED:04:64': ['RawColor', { r: 0.5 }],
// });
// 
// op.addTrigger({
//   'var': '7C:9E:BD:ED:9B:24.center'
// }, {
//   '7C:9E:BD:F4:37:9C': ['HueWalker'],
//   '7C:9E:BD:ED:9B:24': ['RawColor', { r: 0 }],
//   '7C:9E:BD:ED:04:64': ['RawColor', { r: 0 }],
// });

// Printer Door
op.addTrigger({
  'var': '7C:9E:BD:ED:04:64.reed'
}, {
  //'7C:9E:BD:ED:04:64': ['RawColor', { r: 1 }],
  '7C:9E:BD:ED:04:64': ['HueWalker'],
}, {
  //'7C:9E:BD:ED:04:64': ['RawColor', { r: 0 }],
  '7C:9E:BD:ED:04:64': ['HueWalker'],
},
);

//op.addTrigger({
//  'var': '7C:9E:BD:ED:9B:24.reed'
//}, {
//  '7C:9E:BD:ED:04:64': ['RawColor', { r: 1 }],
//}, {
//  '7C:9E:BD:ED:04:64': ['RawColor', { r: 0 }],
//},
//);

deviceStore.on('stateChange', deviceState => {
  const scenes = op.process(deviceState);

  deviceStore.setScenes(scenes);
});

