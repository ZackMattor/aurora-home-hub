// Activate
// FF
//
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();
const log = console.log;
import chalk from 'chalk';
import mqtt from 'mqtt';

const MQTT_ENDPOINT = process.env.MQTT_ENDPOINT || 'mqtt://localhost:1883';
const DEVICE_INFO = {
  size: {
    width: 20,
    height: 10,
  },
  id: 'adsfasdf',
  name: 'Zacks Device'
};
const FF_TOPIC = `devices/${DEVICE_INFO.id}/frame`;

console.clear();

const mqtt_con = mqtt.connect(MQTT_ENDPOINT);

// SUBSCRIBE TO INTERESTING MQTT TOPICS
mqtt_con.subscribe('aurora_server_online');
mqtt_con.subscribe(FF_TOPIC);

/** ACTIVATE **/
mqtt_con.publish('activate', JSON.stringify(DEVICE_INFO));


/** HANDLE MESSAGES FROM MQTT **/
const actions = {};

actions['aurora_server_online'] = (_) => {
    mqtt_con.publish('activate', JSON.stringify(DEVICE_INFO));
};
actions[FF_TOPIC] = (msg) => {
  for(let i = 0; i < DEVICE_INFO.size.width * DEVICE_INFO.size.height; i++) {
    if(i != 0 && i%DEVICE_INFO.size.width === 0) {
      log();
    }
    process.stdout.write(chalk.rgb(msg.readUInt8(i*3), msg.readUInt8(i*3+1), msg.readUInt8(i*3+2))("#"));
  }

  readline.cursorTo(process.stdout, 0,0);
};

mqtt_con.on('message', (topic, msg) => {
  let action = actions[topic];

  if(!action) {
    console.log('CANT HANDLE TOPIC');
    return;
  };

  action(msg);
});
