/* Demonstration of Node’s cluster API which automatically spawns a master process and a worker for each additional core */

const cluster = require('cluster');
const http = require('http');

//determines the server’s number of cores
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  //creates a fork for each core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker %s died.', worker.process.pid);
  });
} else {
  //defines work to be done by each worker
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('I am a worker running in process: ' + process.pid);
  }).listen(8000);
}
