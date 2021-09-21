import jsonLogic from 'json-logic-js';

export class Operator {
  constructor() {
    this._triggers = [];
  }

  addTrigger(logic, positiveScene, negativeScene={}) {
    this._triggers.push({logic, positiveScene, negativeScene});
  }

  process(deviceState) {
    let ret = [];

    for(const trigger of this._triggers) {
      console.log(deviceState);
      const res = jsonLogic.apply(trigger.logic, deviceState);

      if(res) {
        ret.push(trigger.positiveScene);
      } else {
        ret.push(trigger.negativeScene);
      }
    }

    console.log(ret);

    return ret;
  }
}
