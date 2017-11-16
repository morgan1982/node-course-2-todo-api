const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
           type: String,
           required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// OVERRIDE THE DEAFAULT METHOD
UserSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}


UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({
        access,
        token
    })

    return user.save().then(() => {
        return token;
    });
}
UserSchema.statics.findByToken = function (token) {
        let User = this;
        let decoded; // otherwise it will give error

        try {
            decoded = jwt.verify(token, 'abc123');
        } catch (e) {
            // return new Promise((resolve, reject) => {
            //     reject();
            // })
            return Promise.reject('test');
        }

        return User.findOne({
            _id: decoded._id,
            'tokens.token': token, // to find nested property use ''
            'tokens.access': 'auth'
        })
}


let User = mongoose.model('User', UserSchema);


// let newUser = new User({
//     email: "JohnDoe@gmail.com"
// });


// newUser.save()
// .then( (doc) => {
//     console.log('User created', doc);
// }, (err) => {
//     console.log('unable to create user');
// })

module.exports = {
    User
}