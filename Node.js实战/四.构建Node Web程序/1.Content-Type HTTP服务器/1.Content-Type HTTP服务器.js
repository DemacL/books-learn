const http = require('http');
const fs = require('fs')

http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type': 'text/plain' })
  fs.readFile('./index.html', (err, data) => {
    res.statusCode = 404;
    // 400 Bad Request
    // 404 Not Found
    // 405 Method Not Allowed
    // 301 Moved Permanently
    res.end(data)
    // setTimeout(() => {
    //   console.log('TimeOut');
    //   res.end('TimeOut')
    // }, 5000);
  })

}).listen(3333)

console.log('serve running at http://localhost:3333/')

