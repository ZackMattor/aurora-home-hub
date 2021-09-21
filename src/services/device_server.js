// Device Conn[ection] Service
//
// We communicate to the devices over a TCP protocol. This service
// is the server that listens for connections from devices and then
// is the layer that communicates with them.
import net from 'net';

export class DeviceServer {
  constructor(device_store) {
    this._devices = device_store;
  }

  listen() {
    let server = net.createServer((socket) => {
      console.log('Client Connected!', socket.remoteAddress);

      socket.on('error', console.error);

      // Handle incoming messages from aurora clients
      socket.on('data', (data) => {
        this.onMessage(data, socket);
      });
    });

    server.listen(1337, '0.0.0.0');
    console.log('server listening on 1337');
  }

  onMessage(msg, socket) {
    console.log(`DeviceConnService -> message received! (${msg})`);

    try {
      msg = JSON.parse(msg);
    } catch (e) {
      console.error('Failed to parse payload...');
      return;
    }

    switch(msg.topic) {
    case 'device_activate':
      this.onDeviceActivate(msg.payload, socket);
      break;
    case 'device_telemetry':
      this.onDeviceTelemetry(msg.payload);
      break;
    default:
      console.log(`topic isn't implemented (${msg.topic})`);
      break;
    }
  }

  onDeviceTelemetry(telemetry_packet) {
    this._devices.ingestDeviceTelemetry(telemetry_packet);
  }

  onDeviceActivate(activate_packet, socket) {
    this._devices.ingestDeviceActivate(activate_packet, this.sendMessage.bind(this, socket));
  }

  sendMessage(socket, packet) {
    socket.write(packet);
  }
}
