/* Using multiple vhost instances */

const connect = require('connect');
const vhost = require('vhost');
const fs = require('fs');

const app = connect()

//you can use vhost more than once in an application to map several hosts to their associated applications
//setting up the vhost middleware manually
// const app1 = require('./sites/expressjs.dev');
// app.use(vhost('expressjs.dev', app1));
// const app2 = require('./sites/learnboost.dev');
// app.use(vhost('learnboost.dev', app2));

//instead manually setup vhost middleware, generate a list of hosts from the filesystem:
const sites = fs.readdirSync('source/sites');
sites.forEach((site) => {
  console.log(' ... %s', site);
  app.use(vhost(site, require('./sites/' + site)));
});

app.listen(3000);