var express = require('express');
var bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');


let app = express();


// MIDDLEWARE
// body parser will conver the string to an object and pass it to the request
app.use(bodyParser.json());


// POST
app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });
    todo.save()
        .then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        })
})


app.listen(3000, () => {
    console.log('serving on port 3000');
 })



 module.exports = {
     app
 }








