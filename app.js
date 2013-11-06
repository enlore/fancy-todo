var express = require('express')
    , db = require('./db')
    , less_middleware = require('less-middleware')
    , path = require('path')
    , app = express()
    , port = 9023

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'views'))
app.use(less_middleware({
    src: path.join(__dirname, 'static'),
    compress: false,
    debug: true,
    prefix: 'css',
    paths: [path.join(__dirname, 'static')]
}))

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.logger())
app.use(express.bodyParser())
app.use( app.router )

app.configure('development', function () {
    app.use(express.errorHandler({
        dumpExceptions  : true,
        showStack       : true
    }))
})

app.configure('production', function () {
    app.use(express.errorHandler())
})

var routes = require('./routes')

app.get('/', routes.index)
app.post('/create', routes.create)
app.get('/destroy/:id', routes.destroy)
app.get('/edit/:id', routes.edit)
app.post('/update/:id', routes.update)

app.listen(port, function () {
    console.log('** Listening on %s in %s mode', app.address, app.settings.env )
})
