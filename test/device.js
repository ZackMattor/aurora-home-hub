// Activate
// FF
//
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config();
const log = console.log;
import chalk from 'chalk';
import mqtt from 'mqtt';

const mqtt_endpoint = process.env.MQTT_ENDPOINT || 'mqtt://localhost:1883';
console.log(mqtt_endpoint);

console.clear();

const mqtt_con = mqtt.connect(mqtt_endpoint);
mqtt_con.subscribe('ff');
mqtt_con.on('message', (topic, msg) => {
  for(let i = 0; i < 5*20; i++) {
    if(i != 0 && i%20 === 0) {
      log();
    }
    process.stdout.write(chalk.rgb(msg.readUInt8(i*3), msg.readUInt8(i*3+1), msg.readUInt8(i*3+2))('#'));
  }
  readline.moveCursor(process.stdout, -60, -5);
});
