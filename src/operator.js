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
      this.addTrigger(triggerData.logic, triggerData.scene)
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

  process(deviceState) {
    let scenes = [];

    for(const trigger of this._triggers) {
      const res = jsonLogic.apply(trigger.logic, deviceState);
      const hasChanged = res !== trigger.previousState;

      if(hasChanged && res) {
        scenes.push(this.enrichScene(deviceState, trigger.positiveScene));
      } else if(hasChanged && !res) {
        scenes.push(this.enrichScene(deviceState, trigger.negativeScene));
      }

      trigger.previousState = res;
    }

    return scenes;
  }

  enrichScene(deviceState, scene) {
    for(const devId in scene) {
      if(deviceState['7C:9E:BD:ED:9B:24']?.pot) {
        let brightness = deviceState['7C:9E:BD:ED:9B:24'].pot / 1024;
        if(!scene[devId][1]) scene[devId][1] = {};
        scene[devId][1].brightness = brightness;
      }
    }

    return scene;
  }
}
