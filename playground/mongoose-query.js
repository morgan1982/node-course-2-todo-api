const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');


let id = "5a0ca7a68a771850142a4000";

if (!ObjectID.isValid(id)) {
    console.log('id not valid');
}


// FIND WITH ID
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
})
// FIND ONE

Todo.findOne({
   _id: id 
}).then((todo) => {
    console.log('todo', todo)
})

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('id not found');
    }
    console.log('todo', todo);
}).catch((e) => console.log(e));