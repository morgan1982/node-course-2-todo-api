let mongoose = require('mongoose');

let ex = mongoose.model('ex', {
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
})

module.exports = {
    ex
}

// new record
let newEx = new ex({
    text: 'Sleep at last',
    name: 'ok'
});

// save the record
newEx.save()
    .then( (doc) => {
        console.log('saved todo', doc);
    }, (err) => {
        console.log('Unable to save todo')
    });
