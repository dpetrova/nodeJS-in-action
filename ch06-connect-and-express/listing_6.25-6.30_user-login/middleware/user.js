const User = require('../models/user');

module.exports = (req, res, next) => {
  //check for logged-in user ID from session
  const uid = req.session.uid;
  //if not authenticated -> next 
  if (!uid) return next();
  //if authenticated -> fetch user data
  User.get(uid, (err, user) => {
    if (err) return next(err);
    //expose user data to response object
    req.user = res.locals.user = user;
    next();
  });
};
