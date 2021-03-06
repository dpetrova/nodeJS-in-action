const auth = require('basic-auth'); //use basic-auth package for authentication
const User = require('../models/user');
const Entry = require('../models/entry');

exports.user = (req, res, next) => {
  User.get(req.params.id, (err, user) => {
    if (err) return next(err);
    if (!user.id) return res.send(404);
    res.json(user);
  });
};

exports.auth = (req, res, next) => {
  req.remoteUser = auth(req);
  next();
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
        res.render('entries/xml', { entries: entries });
      }
    })
  });
};
