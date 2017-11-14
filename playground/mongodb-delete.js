const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to the database');
    }
    console.log('connected to mongodb');

    db.collection('Todos').deleteMany({text: 'Eat lunch'})
            .then( (result) => {
                console.log(result);
            });


});