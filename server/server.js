const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate');
// let { ex } = require('./models/ex');


let app = express();
const port = process.env.PORT || 3000;


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

// GET
app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({
                todos
                });
        }, (err) => {
            res.status(400).send(err);
        })
})
// GET /todos/id
app.get('/todos/:id', (req, res) => {

    let id = req.params.id

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
    if (!todo) {
        return res.status(404).send();
    }
        res.send({todo});
        }).catch((e) => {
    res.status(400).send();
    })

})

//DELETE
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((e) => {
        res.status(400).send();
    })
})
//UPDATE
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']); // fetches the text and completed property only

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
                            $set: body
                        }, 
                        {
                            new: true  
                        }
            ).then((todo) => {
                if (!todo) {
                    return res.status(404).send();
                }
                res.send({todo});
            }).catch((e) => {
                res.status(400).send();
            })

})
// POST /users
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    let user = new User(body);

    user.save()
        .then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        }).catch((e) => {
            res.status(400).send();
        })
})



app.get('/users/me',authenticate, (req, res) => {
    res.send(req.user);
})



app.listen(port, () => {
    console.log(`serving on port ${ port }`);
 })



 module.exports = {
     app
 }








