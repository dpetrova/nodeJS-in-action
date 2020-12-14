'use strict';
const auth = require('basic-auth');
const User = require('../models/user');
const Entry = require('../models/entry');

exports.auth = (req, res, next) => {
  const { name, pass } = auth(req);
  User.authenticate(name, pass, (err, user) => {
    if (user) req.remoteUser = user;
    next(err);
  });
};

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
};

exports.entries = (req, res, next) => {
  const page = req.page;
  //fetch entry data
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err);
    //respond differently, based on Accept header value
    res.format({
      //JSON response
      'application/json': () => {
        res.send(entries);
      },
      //XML response
      'application/xml': () => {        
        // res.write('<entries>\n');
        // entries.forEach((entry) => {
        //   res.write(```
        //     <entry>
        //     <title>${entry.title}</title>
        //     <body>${entry.body}</body>
        //     <username>${entry.username}</username>
        //     </entry>
        //     ```
        //     );
        //   });
        //   res.end('</entries>');
        res.render('entries/xml', { entries: entries });         
      }
    });
  });
};
