/* A simple chat server implemented with Redis pub/sub functionality */

const net = require('net');
const redis = require('redis');

//defines setup logic for each user connecting to chat server
const server = net.createServer(socket => {
  
  //create subscriber client for each user
  const subscriber = redis.createClient();
  //subscribe to a channel
  subscriber.subscribe('main');
  //when a message is received from a channel, shows it to user
  subscriber.on('message', (channel, message) => {
    socket.write(`Channel ${channel}: ${message}`);
  });

  //create publisher client for each user
  const publisher = redis.createClient();
  //when user enters amessage, publishes it
  socket.on('data', data => {
    publisher.publish('main', data);
  });

  //if user disconnects, ends client connections
  socket.on('end', () => {
    subscriber.unsubscribe('main');
    subscriber.end(true);
    publisher.end(true);
  });
});

server.listen(3000);
