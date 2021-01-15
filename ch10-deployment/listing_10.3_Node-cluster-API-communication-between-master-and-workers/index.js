/* Demonstration of communication between master and workers in Node’s cluster API */

'use strict';

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const workers = {};
let requests = 0;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    workers[i] = cluster.fork();
    ((i) => {
      //listen for messages from worker
      workers[i].on('message', (message) => {
        if (message.cmd == 'incrementRequestTotal') {
          //increase total requests
          requests++;
          for (var j = 0; j < numCPUs; j++) {
            //send new total requests to each worker
            workers[j].send({
              cmd: 'updateOfRequestTotal',
              requests: requests
            });
          }
        }
      });
    })(i); //uses closure to preserve the value of worker
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %s died.', worker.process.pid);
  });
} 
else {
  //listen for messages from master
  process.on('message', (message) => {    
    if (message.cmd === 'updateOfRequestTotal') {
      //updates request count using master’s message
      requests = message.requests;
    }
  });

  http.Server((req, res) => {
    res.writeHead(200);
    res.end(`Worker ${process.pid}: ${requests} requests.`);
    //lets master know total requests should increase
    process.send({ cmd: 'incrementRequestTotal' });
  }).listen(8000);
}
