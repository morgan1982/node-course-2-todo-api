const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to the database');
    }
    console.log('connected to mongodb');


    db.collection('Todos')
            // .find({_id: new ObjectID('pass the id')})
            .find({completed: false})
            .toArray()
            .then( (docs) => {
                console.log('Todos');
                console.log(JSON.stringify(docs, undefined, 2));
            }, (err) => {
                console.log('unable to fetch todos', err);
            });

            // db.close();

})