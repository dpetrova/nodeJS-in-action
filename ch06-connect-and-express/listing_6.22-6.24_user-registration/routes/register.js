const User = require('../models/user');

//render the registration form
exports.form = (req, res) => {
  res.render('register', { title: 'Register' });
};

//submit the registration form
exports.submit = (req, res, next) => {
  var data = req.body.user;
  console.log('User:', req.body.user);
  //check whether Defers username is unique
  User.getByName(data.name, (err, user) => {
    //defer database connection errors and other errors
    if (err) return next(err);
    //username is already taken
    if (user.id) {
      res.error('Username already taken!');
      res.redirect('back');
    } else {
      //create a user with post data
      user = new User({ name: data.name, pass: data.pass });
      //save new user
      user.save((err) => {
        if (err) return next(err);
        //store uid for authentication
        req.session.uid = user.id;
        //redirect to entry listing page
        res.redirect('/')
      });
    }
  });
};
