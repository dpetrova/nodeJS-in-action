//When users close their connections and leave the chat room,
//they leave behind a listener that will attempt to write to a client that’s no longer connected.
//This will, of course, generate an error. To fix this issue,
//you need to add the listener in the following listing to the channel event emitter, and
//add logic to the server’s close event listener to emit the channel’s leave event.

"use strict";
const events = require("events");
const net = require("net");
const channel = new events.EventEmitter();
channel.setMaxListeners(50); //increase the number of allowed listeners (else Node displays warning when there are more than 10 listeners)

channel.clients = {};
channel.subscriptions = {};
channel.on("join", (id, client) => {
  this.clients[id] = client;
  this.subscriptions[id] = (senderId, message) => {
    if (id != senderId) {
      this.clients[id].write(message);
    }
  };
  this.on("broadcast", this.subscriptions[id]);
  //provide users connecting to chat with a count of currently connected users
  //use listeners method, which returns an array of listeners for a given event type
  const welcome = `Welcome! Guests online: ${
    this.listeners("broadcast").length
  }`;
  client.write(`${welcome}\n`);
});

//Creates listener for leave event
channel.on("leave", (id) => {
  //Removes broadcast listener for specific client
  channel.removeListener("broadcast", this.subscriptions[id]);
  channel.emit("broadcast", id, id + " has left.\n");
});

channel.on("shutdown", () => {
  channel.emit("broadcast", "", "The server has shut down.\n");
  channel.removeAllListeners("broadcast"); // remove all listeners of a given type
});

const server = net.createServer((client) => {
  const id = [client.remoteAddress, client.remotePort].join(":");
  console.log("Client connected:", id);

  channel.emit("join", id, client);

  client.on("data", (data) => {
    data = data.toString();
    // when any chat participant enters shutdown into the chat, it’ll cause all participants to be kicked off
    if (data === "shutdown\r\n") {
      channel.emit("shutdown");
    }
    channel.emit("broadcast", id, data);
  });

  client.on("close", () => {
    console.log("Client disconnected:", id);
    //Emits leave event when client disconnects
    channel.emit("leave", id);
  });
});
server.listen(8888);
