var mongoose    = require('mongoose')
    , Todo      = mongoose.model('Todo')
    , utils     = require('connect').utils
    , uuid      = require('node-uuid')

exports.index = function(req, res, next) {
    // find all todos by user id
    Todo.find({u_id: req.cookies.u_id}).
        sort('-updated_at').
        exec(function (err, todos, count) {
            if (err) next(err)
            console.log('---- finding by cookie u_id: %s', req.cookies.u_id)
            res.render('index', {todos: todos})
        })
    }

exports.create = function (req, res, next) {
    new Todo({
        u_id        : req.cookies.u_id,
        content     : req.body.content,
        updated_at  : new Date()
    }).save(function (err, todo, count) {
        console.log('---- INFO: saved id: %s u_id: %s', todo._id, todo.u_id)
        if (err) return next(err)
        res.redirect('/')
    })
}

exports.destroy = function (req, res, next) {
    Todo.findById(req.params.id, function (err, todo) {
        if (todo.u_id !== req.cookies.u_id) {
            console.log('---- INFO: can\'t let you do that, staaarfooox\n' +
                '      tried to delete %s with u_id %s', todo._id, todo.u_id)
            res.redirect('/')
        }

        todo.remove(function (err, todo) {
            if (err) return next(err)
            else {
                console.log('---- INFO: destroyed id: %s', todo._id)
                res.redirect('/')
            }
        })
    })
}

exports.edit = function (req, res, next) {
    Todo.find({u_id: req.cookies.u_id}).
        sort('-updated_at').
        exec(function (err, todos, count) {
            if (err) return next(err)
            else {
                res.render('edit', {
                    todos   : todos,
                    current : req.params.id
                })
            }
    })
}

exports.update = function (req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        todo.content = req.body.content
        todo.updated_at = new Date()
        todo.save(function (err, todo) {
            console.log('---- saved %s', todo._id)
            res.redirect('/')
        })
    })
}

exports.current_user = function (req, res, next) {
    if (!req.cookies.u_id) {
        u_id = uuid.v1()
        console.log('---- setting cookie u_id: %s', u_id)
        res.cookie('u_id', u_id)
    } else {
        console.log('---- current cookie u_id: %s', req.cookies.u_id)
    }

    next()
}
