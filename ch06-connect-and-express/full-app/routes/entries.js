const Entry = require('../models/entry');

//list all entries in range
exports.list = (req, res, next) => {
  const page = req.page;
  //retrieve entries
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err);
    //reder http response
    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

//submit form
exports.submit = (req, res, next) => {
  const data = req.body.entry; //come from name='entry[...]' in the form
  const entry = new Entry({
    username: res.locals.user.name, //middleware for loading users 
    title: data.title,
    body: data.body
  });
  entry.save((err) => {
    if (err) return next(err);
    if (req.remoteUser) {
      res.json({ message: 'Entry added.' });
    } else {
      res.redirect('/');
    }
  });
};

//render form for adding entry
exports.form = (req, res) => {
  res.render('post', { title: 'Post' });
};
