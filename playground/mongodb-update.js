const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to the database');
    }
    console.log('connected to mongodb');


    db.collection('Todos')
    // filter update options callback 
        .findOneAndUpdate({
            _id: new ObjectID('5a0b57dbb3f17d0990637de4')
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then( (result) => {
            console.log(result);
        });

    db.collection('Todos')
    // filter update options callback 
        .findOneAndUpdate({
            _id: new ObjectID('5a0b57dbb3f17d0990637de4')
        }, {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then( (result) => {
            console.log(result);
        });
    
        //db.close();

});