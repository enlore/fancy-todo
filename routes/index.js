var mongoose = require('mongoose')
    , Todo = mongoose.model('Todo')

exports.index = function(req, res) {
    Todo.find(function (err, todos, count) {
        res.render('index', {
            todos: todos
        })
    })
}

exports.create = function (req, res) {
    new Todo({
        content     : req.body.content,
        updated_at  : new Date()
    }).save(function (err, todo, count) {
        console.log('----\nINFO: saved id: %s content: %s\n----\n', todo._id, todo.content)
        res.redirect('/')
    })
}

exports.destroy = function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        todo.remove(function (err, todo) {
            if (err) console.log(err)
            else {
                console.log('----\nINFO: destroyed id: %s', todo._id)
                res.redirect('/')
            }
        })
    })
}
