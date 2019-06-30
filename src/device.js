import AnimationClasses from './animations/index';

const log = (...args) => {
  console.log("Device >>", ...args);
};

export class Device {
  constructor(mqtt_client) {
    this.mqtt = mqtt_client;
    this.active_animation = null;

    log('New device created');
  }

  activate({id, name, size, default_animation_name}) {
    this.id = id;
    this.name = name;
    this.size = size;

    this.setAnimation(default_animation_name || 'rainbow_scroll');
  }

  setAnimation(animation_name) {
    if(this.active_animation) {
      this.active_animation.end();
    }

    this.active_animation = new AnimationClasses[animation_name](this.size);
    this.active_animation.start((frame) => {
      this.sendMessage('frame', frame);
    });
  }

  sendMessage(topic, message) {
    let device_topic = `devices/${this.id}/${topic}`;
    //log('sending message ', device_topic);
    this.mqtt.publish(device_topic, message);
  }
}
