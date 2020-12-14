const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient(); //create long-running Redis connection

//cb is a vanilla callback function which is passed into a (typically) asynchronous function, which is a common pattern in node.js

class User {
  //constructor accepts an object and merges this object’s properties into its own
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  save(cb) {
    //the user already exists if an ID is set
    if (this.id) {
      this.update(cb);
    }
    //a new user
    else {
      //create a unique ID
      db.incr('user:ids', (err, id) => {
        if (err) return cb(err);
        //set the id so it’ll be saved by update()
        this.id = id; 
        //hash the password
        this.hashPassword((err) => {
          if (err) return cb(err);
          //saves the user properties
          this.update(cb);
        });
      });
    }
  }

  update(cb) {
    const id = this.id;
    // /index users by name
    db.set(`user:id:${this.name}`, id, (err) => {
      if (err) return cb(err);
      //use Redis to store the current class’s properties
      db.hmset(`user:${id}`, this, (err) => {
        cb(err);
      });
    });
  }

  hashPassword(cb) {
    //generate a 12-character salt (salt acts as a private key for the hashing mechanism against rainbow table attacks)
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      //set salt so it’ll be saved by update()
      this.salt = salt;
      //generate hash
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return cb(err);
        //sets hash so it’ll be saved by update()
        this.pass = hash;
        cb();
      });
    });
  }

  static getByName(name, cb) {
    //look up user ID by name
    User.getId(name, (err, id) => {
      if (err) return cb(err);
      //grab user with the ID
      User.get(id, cb);
    });
  }

  static getId(name, cb) {
    //get ID indexed by name
    db.get(`user:id:${name}`, cb);
  }

  static get(id, cb) {
    //fetch plain object hash
    db.hgetall(`user:${id}`, (err, user) => {
      if (err) return cb(err);
      //convert plain object to a new User object
      cb(null, new User(user));
    });
  }

  static authenticate(name, pass, cb) {
    //look up user by name
    User.getByName(name, (err, user) => {
      if (err) return cb(err);
      //if user doesn't exist
      if (!user.id) return cb();
      //hash the given password
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) return cb(err);
        //match password hash found
        if (hash == user.pass) return cb(null, user);
        //invalid password
        cb();
      });
    });
  }
}

module.exports = User; //export the User class
