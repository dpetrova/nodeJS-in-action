const knex = require('knex');

/* sqlite3 connection */
//first install Knex and sqlite3: 'npm install knex@~0.12.0 sqlite3@~3.1.0 --save
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: 'tldr.sqlite'
    //in-memory mode, which avoids writing to disk entirely (commonly used to decrease the running time of automated tests) -> no transaction durability; all data is lost when the process exits
    //filename: ':memory:' 
  },
  useNullAsDefault: true
});

/* postgre connection */
//first install Postgre: 'npm install pg --save'
//second create database using PostgreSQL’s createdb command-line utility: 'createdb articles'
// const db = knex({
//   client: 'pg',
//   connection: {
//     database: 'articles'
//   }
// })

module.exports = () => {
  return db.schema.createTableIfNotExists('articles', table => {
    table.increments('id').primary();
    table.string('title');
    table.text('content');
  });
};

module.exports.Article = {
  all() {
    return db('articles').orderBy('title');
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