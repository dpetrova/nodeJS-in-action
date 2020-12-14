//testing the user model:
//1. start the Redis server by entering redis-server on the command line
//2.  run node user-test.js on the command line to execute the creation of the example user

const User = require('./models/user');
//create new user
const user = new User({ name: 'Tobi', pass: 'test' });

//save user
user.save((err) => {
  if (err) console.error(err);
  console.log('user id %d', user.id);
});


//if you want to try fetching a user, you can try code like this:
User.getByName('tobi', (err, user) => {
 console.log(user);
});