import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';

import { LightsController } from './app_server/lights_controller.js';
import { AnimationsController } from './app_server/animations_controller.js';

// This is currently a very dumb app server... it is only capable of modify the passthrough state which is the current default for the icosahedron

export class AppServer {
  constructor(device_store) {
    this.devices = device_store;
    this.swaggerDocument = yaml.load(fs.readFileSync('./src/services/app_server/swagger.yaml', 'utf8'));
  }

  listen() {
    this.listen_http();
    this.listen_stream();
  }

  listen_http() {
    const port = 8080;
    const app = express();

    app.disable('x-powered-by');
    app.use(cors());

    app.listen(port, () => {
      console.log(`HTTP App server listening on port ${port}`);
    });

    app.use('/api/v1', [AnimationsController(), LightsController(this.devices)]);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument));
  }

  listen_stream() {
    const wss = new WebSocketServer({ port: 1338 });

    wss.on('connection', (ws) => {
      console.log('We got an app connection!');

      ws.on('message', (message) => {
        let data = JSON.parse(message);

        let light = this.devices.find(data.light_id);

        if(light) {
          light.animation.setConfig('pixel_state', data.pixel_state);
        }
      });
    });
  }
}
