import { Router } from 'express';
import bodyParser from 'body-parser';

export function lightsController(devices) {
  const router = Router();

  const findResource = (req, res, next) => {
    let light = devices.find(req.params.lightId);
    let animation = light && light.animation;

    if(light && animation) {
      req.light = light;
      req.animation = animation;

      next();
    } else {
      res.sendStatus(404);
    }
  };

  router.use(bodyParser.json());

  router.get('/lights', (req, res) => {
    res.json(devices.serialize());
  });

  router.get('/lights/:lightId/animation', findResource, (req, res) => {
    res.json(req.animation.serialize());
  });

  router.post('/lights/:lightId/animation', findResource, (req, res) => {
    const conf = req.body.config || {};
    console.log(conf);

    for(const key in conf) {
      req.animation.setConfig(key, conf[key]);
    }

    res.json(req.animation.serialize());
  });

  router.patch('/lights/:lightId/animation', findResource, (req, res) => {
    const conf = req.body.config || {};
    console.log(conf);

    for(const key in conf) {
      req.animation.setConfig(key, conf[key]);
    }

    res.json(req.animation.serialize());
  });

  return router;
}


