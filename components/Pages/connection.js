const mqtt = require('mqtt/dist/mqtt');

var options = {
  port: 12676,
  host: 'mqtt://farmer.cloudmqtt.com',
  clientId:
    'mqttjs_' +
    Math.random()
      .toString(16)
      .substr(2, 8),
  username: 'default',
  password: 'test',
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clean: true,
  encoding: 'utf8',
};
// var client = mqtt.connect(options.host, options);
var client = mqtt.connect('mqtts://mqtt.flespi.io', {
  // rejectUnauthorized: false,
  username: 'Xv5FtMgATtUvxxTJAdB6vOrWoUPtg2L1lEwCfC0YTKhh81Ow2eqnSHa6qNowDZnM',
});

client.on('connect', function() {
  client.subscribe('plantifi/add', function(err) {
    if (!err) {
      client.publish('plantifi/add', 'Hello mqtt');
      console.log('message send');
    }
  });
});

export const sendMsg = (data) => {
  const msg = JSON.stringify(data)
  console.log(msg)
  client.publish('plantifi/add', msg)
};

client.on('message', function(topic, message) {
  // message is Buffer
  // console.log("messgae " + message.toString());
  //   client.end();
});
