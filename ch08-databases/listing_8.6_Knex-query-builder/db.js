/* Using Knex to connect and query sqlite3 */

const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'tldr.sqlite'
  },
  useNullAsDefault: true //setting this as a default works better when changing back ends
});

module.exports = () => {
  return db.schema.createTableIfNotExists('articles', table => {
    table.increments('id').primary(); //define a primary key named “id” that autoincrements upon insertion
    table.string('title'); //
    table.text('content');
  });
};

module.exports.Article = {
  all() {
    return db('articles').orderBy('title');
  },

  titles() {
    return db('articles').select('title').orderBy('title');
  },

  find(id) {
    return db('articles').where({ id }).first();
  },

  create(data) {
    return db('articles').insert(data);
  },

  delete(id) {
    return db('articles').del().where({ id });
  }
};
