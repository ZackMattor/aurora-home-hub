import WebSocket from 'ws';
import { PassthroughState } from '../animations/passthrough_state.js';
import express from 'express';

// This is currently a very dumb app server... it is only capable of modify the passthrough state which is the current default for the icosahedron

export class AppServer {
  constructor(device_store) {
    this.devices = device_store;
  }

  listen() {
    this.listen_http();
    this.listen_stream();
  }

  listen_http() {
    const port = 8080;
    const app = express();

    app.listen(port, () => {
      console.log(`HTTP App server listening on port ${port}`);
    });

    app.get('/lights', (req, res) => {
      res.send(this.devices.serialize());
    });

    app.get('/lights/:lightId/animation', (req, res) => {
      let light = this.devices.find(req.params.lightId);

      if(light) {
        let animation = light.animation;

        res.send(animation.serialize());
      } else {
        res.sendStatus(404);
      }
    });
  }

  listen_stream() {
    const wss = new WebSocket.Server({ port: 1338 });

    wss.on('connection', (ws) => {
      console.log('We got an app connection!');

      ws.on('message', (message) => {
        let data = JSON.parse(message);

        PassthroughState.setState('icosahedron', data);
      });
    });
  }
}
