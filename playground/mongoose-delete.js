const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');



//remove all entries 

Todo.remove({}).then((res) => {
    console.log(res);
})

Todo.findByIdAndRemove('asfd').then((todo) => {
    console.log(todo);
})