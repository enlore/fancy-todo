var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var Todo = new Schema({
    u_id            : String
    , content       : String
    , updated_at    : Date
    , done          : {type: Boolean, default: false}
})

mongoose.model('Todo', Todo)

mongoose.connect('mongodb://localhost/express-todo')
