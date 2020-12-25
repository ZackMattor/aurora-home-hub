// Device Conn[ection] Service
//
// We communicate to the devices over the MQTT protocol.
// This MQTT server is how we send updates to the Aurora
// devices emit a device telemetry upon connection and
// every 10 seconds after that.
import mqtt from 'mqtt';
import net from 'net';

export class DeviceConnService {
  constructor(mqqtt_server_url, device_store) {
    this._devices = device_store;
    //this._mqtt_server_url = mqqtt_server_url;
  }

  listen() {
    let server = net.createServer((socket) => {
      console.log('create server callback');
      //socket.pipe(socket);

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
    } catch(e) {
      console.error('Failed to parse payload...');
      return;
    }

    // Debug log for raw socket data
    //console.log('data!', msg);

    switch(msg.topic) {
    case 'device_telemetry':
      this.onDeviceTelemetry(msg.payload, socket);
      break;
    default:
      console.log(`topic isn't implemented (${msg.topic})`);
      break;
    }
  }

  onDeviceTelemetry(telemetry_packet, socket) {
    let { device_id } = telemetry_packet;
    this._devices.ingestDeviceTelemetry(telemetry_packet, this.sendMessage.bind(this, socket));
  }

  sendMessage(socket, msg_type, packet) {
    socket.write(packet);
    //const topic = `${device_id}_${msg_type}`;
    //console.log(`${topic} ${packet}`)
    //this.client.publish(topic, packet);
  }
}
