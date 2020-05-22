const net = require('net')


net.createServer((socket) => {
  socket.on('data', data => {
    socket.write(data )
  })
}).listen(3333, () => {
  console.log('net serve running at http://localhost:3333/')
});

 