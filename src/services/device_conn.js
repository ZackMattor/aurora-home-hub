// Device Conn[ection] Service
//
// We communicate to the devices over the MQTT protocol.
// This MQTT server is how we send updates to the Aurora
// devices emit a device telemetry upon connection and
// every 10 seconds after that.
import mqtt from 'mqtt';

export class DeviceConnService {
  constructor(mqqtt_server_url, device_store) {
    this._devices = device_store;
    this._mqtt_server_url = mqqtt_server_url;
  }

  listen() {
    console.log(`DeviceConnService -> Connecting to the MQTT server (${this._mqtt_server_url})...`);
    this.client = mqtt.connect(this._mqtt_server_url);

    this.client.on('message', this.onMessage.bind(this));
    this.client.on('reconnect', _ => console.error('DeviceConnService -> Attempting reconnecting...'));
    this.client.on('connect', _ => {
      this.client.subscribe('device_telemetry');
      console.error(`DeviceConnService -> Connected to ${this._mqtt_server_url}...`);
    });
    this.client.on('error', console.error);
  }

  onMessage(topic, msg) {
    console.log(`DeviceConnService -> message received! ${topic} | ${msg}`);

    switch(topic) {
    case 'device_telemetry':
      this.onDeviceTelemetry(msg);
      break;
    }
  }

  onDeviceTelemetry(telemetry_packet) {
    try {
      telemetry_packet = JSON.parse(telemetry_packet);
    } catch(e) {
      console.error(e);
      return;
    }
    let { device_id } = telemetry_packet;
    this._devices.ingestDeviceTelemetry(telemetry_packet, this.sendMessage.bind(this, device_id));
  }

  sendMessage(device_id, msg_type, packet) {
    const topic = `${device_id}_${msg_type}`;
    //console.log(`${topic} ${packet}`)
    this.client.publish(topic, packet);
  }
}
