import { Router } from 'express';
import bodyParser from 'body-parser';

export function LightsController(devices) {
  const router = Router();

  const findResource = (req, res, next) => {
    let light = devices.find(req.params.lightId);
    let animation = light && light.animation;

    if(light && animation) {
      req.light = light;
      next();
    } else {
      res.sendStatus(404);
    }
  };

  const requireAttrs = (...attrs) => {
    return (req, res, next) => {
      let errors = [];

      for(const attr of attrs) {
        if(typeof req.body[attr] === 'undefined') {
          errors.push(attr);
        }
      }

      if(errors.length === 0) {
        next();
      } else {
        console.error('Missing required attrs... ', errors);
        res.sendStatus(422);
      }
    };
  };

  router.use(bodyParser.json());

  router.get('/lights', (req, res) => {
    res.json(devices.serialize());
  });

  router.get('/lights/:lightId', findResource, (req, res) => {
    res.json(req.light.serialize());
  });


  router.get('/lights/:lightId/animation', findResource, (req, res) => {
    res.json(req.light.animation.serialize());
  });

  // Start a new animation
  router.post('/lights/:lightId/animation', requireAttrs('id'), findResource, (req, res) => {
    let {
      config,
      id
    } = ( req.body || {} );

    config = config || {};

    req.light.setAnimation(id);
    console.log(config);

    for(const key in config) {
      req.light.animation.setConfig(key, config[key]);
    }

    res.json(req.light.animation.serialize());
  });

  // Update an existing running animation
  router.patch('/lights/:lightId/animation', findResource, (req, res) => {
    const config = req.body.config || {};
    console.log(config);

    for(const key in config) {
      req.light.animation.setConfig(key, config[key]);
    }

    res.json(req.light.animation.serialize());
  });

  return router;
}
