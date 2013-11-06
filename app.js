var express = require('express')
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

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(port)
console.log('** Listening on ' + port)
