import WebSocket from 'ws';
import { PassthroughState } from '../animations/passthrough_state';

// This is currently a very dumb app server... it is only capable of modify the passthrough state which is the current default for the icosahedron

export class AppServer {
  constructor() {
  }

  listen() {
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
