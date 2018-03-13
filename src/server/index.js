var mqtt = require('mqtt');
//var WebSocketServer = require('websocket').server;
//var http = require('http');

//var client_data = Buffer.alloc(300, 0, 'binary');
//var server = http.createServer();

//server.listen(1337);

//wsServer = new WebSocketServer({
//  httpServer: server
//});

//wsServer.on('request', (request) => {
//  console.log('connection');
//  var connection = request.accept(null, request.origin);
//
//  connection.on('message', (message) => {
//    client_data = message.binaryData
//  });
//});

// Setup MQTT
var client = mqtt.connect("mqtt://mqtt.zackmattor.com:1883");
client.on('connect', () => {
  console.log('mqtt connected!');
  let animation_name = "color_ladder";

  let Klass = require(`./animations/${animation_name}.js`);
  let animation = new Klass();
  animation.start();

  setInterval(() => {
    client.publish("ff", animation.render());
  }, animation.interval);
});


//var animation = new Array();
//var record_count = 0;
//
//setInterval(() => {
//  frame_data = Buffer.alloc(300, 0, 'binary');
//
//  if(record_count < 60*10) {
//    for(var i=0; i<300; i++) {
//      frame_data[i] = client_data[i] + server_data[i];
//
//      if(frame_data[i] > 200) frame_data[i] = 200;
//
//      animation[record_count] = frame_data;
//    }
//  } else {
//    frame_data = animation[record_count % (60*10)];
//  }
//
//  record_count++;
//  client.publish("ff", frame_data);
//}, 1000/60);
