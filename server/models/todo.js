let mongoose = require('mongoose');


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

// // new record
// let newTodo = new Todo({
//     text: 'Sleep at last'
// });

// // save the record
// newTodo.save()
//     .then( (doc) => {
//         console.log('saved todo', doc);
//     }, (err) => {
//         console.log('Unable to save todo')
//     });



module.exports = {
    Todo
}