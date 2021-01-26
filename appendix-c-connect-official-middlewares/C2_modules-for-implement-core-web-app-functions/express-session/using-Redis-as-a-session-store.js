/* Using Redis as a session store */

const connect = require('connect');
const session = require('express-session');
const favicon = require('serve-favicon');
//pass the instance of express-session to RedisStore
const RedisStore = require('connect-redis')(session);

const options = {
 host: 'localhost'
};

connect()
  .use(favicon(__dirname + '/favicon.ico'))
  //configure the session with the recommended defaults and RedisStore
  .use(session({
    store: new RedisStore(options),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))
  .use((req, res) => {
    req.session.views = req.session.views || 0;
    req.session.views++;
    res.end('Views: ' + req.session.views);
  })
  .listen(3000);