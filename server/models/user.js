let mongoose = require('mongoose');
var Schema = mongoose.Schema;


let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});
let User = mongoose.model('User', userSchema)


// let newUser = new User({
//     email: "JohnDoe@gmail.com"
// });


// newUser.save()
// .then( (doc) => {
//     console.log('User created', doc);
// }, (e) => {
//     console.log('unable to create user');
// })

module.exports = {
    User
}