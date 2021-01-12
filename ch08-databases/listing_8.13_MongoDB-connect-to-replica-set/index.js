const os = require('os');
const { MongoClient } = require('mongodb');
const hostname = os.hostname();

const members = [
  `${hostname}:27018`,
  `${hostname}:27017`,
  `${hostname}:27019`
];

//test is the name of the database; rs0 is the name of the replica set
MongoClient.connect(`mongodb://${members.join(',')}/test?replSet=rs0`)
.then(db => {
  //replSetGetStatus prints the members and metadata about the replica set
  db.admin().replSetGetStatus().then(status => {
    console.log(status);
    db.close();
  });
});
