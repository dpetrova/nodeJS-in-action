// user loading middleware

const User = require('../models/user');

module.exports = (req, res, next) => {
  // populate res.locals.user with the user data loaded by the basic-auth middleware
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
  }
  const uid = req.session.uid;
  if (!uid) return next();
  User.get(uid, (err, user) => {
    if (err) return next(err);
    req.user = res.locals.user = user;
    next();
  });
};
