//SIMPLE CHAT SERVER
//The following code defines a channel event emitter
//with a single listener that responds to someone joining the channel

//Events are keys that can have any string value: data, join, or (completely arbitrary)
//Only one event, called error, is special

"use strict";
const events = require("events"); //Node’s built-in events module
const net = require("net");
const channel = new events.EventEmitter();

channel.clients = {};
channel.subscriptions = {};
//Adds a listener for the join event that stores a user’s client object, allowing the application to send data back to the user
//use on (or the longer form addListener) to add a listener to an event emitter
channel.on("join", (id, client) => {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    //Ignores data if it’s been directly broadcast by the user
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  //Adds a listener, specific to the current user, for the broadcast event
  this.on("broadcast", this.subscriptions[id]);
});

const server = net.createServer((client) => {
  const id = `${client.remoteAddress}:${client.remotePort}`;
  //Emits a join event when a user connects to the server, specifying the user ID and client object
  channel.emit("join", id, client); //trigger an event
  client.on("data", (data) => {
    data = data.toString();
    //Emits a channel broadcast event, specifying the user ID and message, when any user sends data
    channel.emit("broadcast", id, data);
  });
});

server.listen(8888);

//After you have the chat server running, open a new command line and enter the following to enter the chat:
//telnet 127.0.0.1 8888
//If you open up a few command lines, you’ll see that anything typed in one command line is echoed to the others
