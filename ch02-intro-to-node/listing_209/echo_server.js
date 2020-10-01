"use strict";
const net = require("net");

const server = net.createServer((socket) => {
  //respond to repeated events
  socket.on("data", (data) => {
    socket.write(data); //data is written (echoed back) to the client
  });
});

server.listen(8888);

//connect to it by entering the following command: telnet 127.0.0.1 8888
//install telnet for windows: http://mng.bz/egzr
