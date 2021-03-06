const User = require('../models/user');

module.exports = (req, res, next) => {
  // populate res.locals.user with the user data loaded by the basic-auth middleware
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
  }
   //check for logged-in user ID from session
  const uid = req.session.uid;
  //if not authenticated -> pass control to next middleware component
  if (!uid) return next();
  //if authenticated -> fetch user data
  User.get(uid, (err, user) => {
    if (err) return next(err);
    //expose user data to response object
    req.user = res.locals.user = user;
    next();
  });
};
