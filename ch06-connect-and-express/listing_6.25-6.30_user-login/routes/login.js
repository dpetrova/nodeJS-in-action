const User = require('../models/user');

//submit login form
exports.submit = (req, res, next) => {
  const data = req.body.user;
  //check credentials
  User.authenticate(data.name, data.pass, (err, user) => {
    //delegate errors
    if (err) return next(err); 
    //handle a user with valid credentials
    if (user) {
      //store uid for authentication (the session will persist this value, which you can use later to retrieve the User)
      req.session.uid = user.id;
      //redirect to entry listing
      res.redirect('/');
    } else {
      //expose an error message
      res.error('Sorry! invalid credentials. ');
      //redirect back to login form
      res.redirect('back');
    }
  });
};

//render login form
exports.form = (req, res) => {
  res.render('login', { title: 'Login' });
};

//remove the session
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  })
};
