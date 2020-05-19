const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const chatServer = require('./lib/chat_server')

const cache = {};


//  文件找不到 返回404
function send404(response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' });
  response.write('Erroe 404');
  response.end();
}

//  返回文件内容作为响应
function sendFile(response, filePath, fileContents) {
  // console.log(path.basename(filePath));
  // console.log(mime.getType(path.basename(filePath)));
  response.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath)) });
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) { // 如果有文件缓存，直接用内存中缓存的文件
    // console.log(`cache ${absPath} hit`);
    sendFile(response, absPath, cache[absPath])
  } else { // 第一次读取文件没有缓存的情况下，读取硬盘上的文件，响应给客户端，并缓存到内存中
    fs.exists(absPath, (exists) => {
      if (exists) {
        fs.readFile(absPath, (err, data) => {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data)
          }
        })
      } else {
        send404(response);
      }
    })
  }
}

const server = http.createServer((request, response) => {
  let filePath = false;
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  if (request.url === '/') {
    filePath = 'public/index.html';
  } else {
    filePath = `public/${request.url}`;
  }

  const absPath = `./${filePath}`;

  serveStatic(response, cache, absPath);
})

server.listen(3333, () => {
  console.log('serve running at http://localhost:3333/')
})

chatServer.listen(server)



