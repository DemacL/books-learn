const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello Node')
}).listen(3333)

console.log('serve running at http://localhost:3333/')

