const Entry = require('../models/entry');

//list all entries in range
exports.list = (req, res, next) => {
  const page = req.page;
  //retrieve entries
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err);
    //reder http response
    res.render('entries', {
      title: 'Entries',
      entries: entries
    });
  });
};

//render form for adding entry
exports.form = (req, res) => {
  res.render('post', { title: 'Post' });
};

//submit form
exports.submit = (req, res, next) => {
  const data = req.body.entry; //come from name='entry[...]' in the form
  const user = res.locals.user; //middleware for loading users 
  const username = user ? user.name : null;
  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  });
  entry.save((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};
