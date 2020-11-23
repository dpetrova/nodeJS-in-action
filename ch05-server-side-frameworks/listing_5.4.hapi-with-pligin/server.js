const Hapi = require('hapi');
const server = new Hapi.Server();
//plugin which adds static file and directory handlers
//adds the reply.file method for sending single files, and a built-in directory handler
const Inert = require('inert');

server.connection({
  host: 'localhost',
  port: 8000
});

server.route({
  method: 'GET',
  path:'/hello',
  handler: (request, reply) => {
    return reply('hello world');
  }
});

//register the plugin
server.register(Inert, () => {});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    // inert settings to serve files in the current path and show an index of the files in that directory
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
