import mqtt from 'mqtt';
import EventEmitter from 'events';

export class DeviceServer extends EventEmitter {
  constructor(mqtt_endpoint) {
    super();

    // MQTT and animation loops
    this.client = mqtt.connect(mqtt_endpoint);

    this.client.on('connect', () => {
      console.log('Connected over MQTT!');

      // Firmware doesn't support activation yet...
      // so this line just mocks it in for the bookcase
      this.onDeviceMessage('activate', {
        name: 'zack_bookcase',
        id: '12345678',
        size: { width: 20, height: 5 }
      });
    });

    this.client.on('message', this.onDeviceMessage.bind(this));
    this.client.publish('aurora_server_online', 'true');
  }

  onDeviceMessage(topic, msg) {
    switch(topic) {
    case 'activate':
      var device_name = msg.name;
      var device_size = msg.size;

      console.log(`${device_name} is trying to activate...`);

      // Logic to possibly fail activation...
      // if(!device) {
      //   console.log(`Failed to activate ${device_name}`);
      //   return;
      // }

      console.log(`${device_name} successfully activated!`);

      this.emit('new_device', {
        last_launched: Date.now(),
        name: device_name,
        size: device_size,
        client: this.client
      });

      break;

    // TODO
    // case 'ping':
    //  break;
    }
  }
}
