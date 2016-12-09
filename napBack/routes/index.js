var router = require('express')()
var http = require('http').Server(router)
var io = require('socket.io')(http)

router.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  })
})

http.listen(4000, function(){
  console.log('listening on *:4000')
})
module.exports = router
