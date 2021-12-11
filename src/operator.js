import jsonLogic from 'json-logic-js';
import yaml from 'js-yaml';

export class Operator {
  constructor() {
    this._triggers = [];
  }

  importYaml(yamlString) {
    const data = yaml.load(yamlString);
    console.log(data);

    for(const triggerData of data.triggers) {
      this.addTrigger(triggerData.logic, triggerData.scene);
    }
  }

  addTrigger(logic, positiveScene, negativeScene={}) {
    this._triggers.push({
      previousState: false,
      logic,
      positiveScene,
      negativeScene
    });
  }

  processScenes(deviceState) {
    console.log(deviceState)
    let scenes = [];

    for(const trigger of this._triggers) {
      const res = jsonLogic.apply(trigger.logic, deviceState);
      const hasChanged = res !== trigger.previousState;

      // If the scenes have changed, push them to our scenes object
      if (hasChanged) {
        scenes.push(res ? trigger.positiveScene : trigger.negativeScene);
      }

      trigger.previousState = res;
    }

    return scenes;
  }

  // enrichScene(deviceState, scene) {
  //   const pot_val = deviceState['webbro'] && deviceState['webbro']['176_21'];

  //   if(pot_val) {
  //     for(const devId in scene) {
  //       console.log(devId)
  //       let brightness = pot_val / 127;

  //       // Set our scene config to empty array if it isn't initialized
  //       if(!scene[devId][1]) scene[devId][1] = {};

  //       // Tweak the config value based off the input value
  //       scene[devId][1].brightness = brightness;
  //       console.log("set brightness", brightness)
  //     }
  //   }

  //   return scene;
  // }
}
