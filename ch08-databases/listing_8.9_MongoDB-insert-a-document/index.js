const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/articles')
  .then(db  => {
    console.log('Client ready');

    const article = {
      title: 'I like cake',
      content: 'It is quite good.'
    };
    db.collection('articles')
      .insertOne(article)
      .then(result => {
        //if the document has no _id, a new ID is created. insertedId will be that ID
        console.log(result.insertedId);
        //the original object defining the document is mutated, adding an _id property
        console.log(article._id);
        db.close();
      });
  }, console.error);
