let mongoose = require('mongoose');


// Mongooze config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


// Schema?
let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // removes any leading and trailing space
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// new record
let newTodo = new Todo({
    text: 'Sleep at last'
});

// save the record
newTodo.save()
    .then( (doc) => {
        console.log('saved todo', doc);
    }, (err) => {
        console.log('Unable to save todo')
    });

// User

let User = mongoose.Model('User' , {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

let newUser = new User({
    email: "JohnDoe@gmail.com"
});

newUser.save()
    .then( (doc) => {
        console.log('User created', doc);
    }, (e) => {
        console.log('unable to create user');
    })


