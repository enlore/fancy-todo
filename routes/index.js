var mongoose = require('mongoose')
    , Todo = mongoose.model('Todo')

exports.index = function(req, res) {
    Todo.find(function (err, todos, count) {
        res.render('index', { todos: todos })
    })
}

exports.create = function (req, res) {
    new Todo({
        content     : req.body.content,
        updated_at  : new Date()
    }).save(function (err, todo, count) {
        res.redirect('/')
    })
}
