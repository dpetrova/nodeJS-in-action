const pg = require('pg');
const db = new pg.Client({ database: 'articles' }); //configuration parameters for the connection

db.connect((err, client) => {
  if (err) throw err;
  console.log('Connected to database', db.database);
  //closes database connection, allows the node process to exit
  db.end(); 
});