const express = require('express')
const path = require('path')
const logger = require('morgan')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const app = express()

const socket = require('./socket.js');

const debug = require('debug')('new-react-app:server')
const http = require('http')
const server = http.createServer(app)
const port = normalizePort(process.env.PORT || '5000')

app.set('port', port)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

const io = require('socket.io').listen(server);
io.sockets.on('connection', socket);

app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'client',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  }
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.use(express.static('client'))

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  // res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

function normalizePort(val) {
 const port = parseInt(val, 10)

 if (isNaN(port)) {
   // named pipe
   return val
 }

 if (port >= 0) {
   // port number
   return port
 }

 return false
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
 if (error.syscall !== 'listen') {
   throw error
 }

 const bind = typeof port === 'string'
   ? 'Pipe ' + port
   : 'Port ' + port

 // handle specific listen errors with friendly messages
 switch (error.code) {
 case 'EACCES':
   console.error(bind + ' requires elevated privileges')
   process.exit(1)
   break
 case 'EADDRINUSE':
   console.error(bind + ' is already in use')
   process.exit(1)
   break
 default:
   throw error
 }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
 const addr = server.address()
 const bind = typeof addr === 'string'
   ? 'pipe ' + addr
   : 'port ' + addr.port
 debug('Listening on ' + bind)
}

module.exports = app
