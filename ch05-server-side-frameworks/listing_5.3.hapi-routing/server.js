const Hapi = require('hapi');
const server = new Hapi.Server();

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

server.route({
  method: 'DELETE',
  path: '/items/{id}',
  handler: (req, reply) => {
    // Delete "item" here, based on req.params.id
    reply(true);
  }
 });

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
