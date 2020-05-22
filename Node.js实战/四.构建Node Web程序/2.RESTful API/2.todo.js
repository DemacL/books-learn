const http = require('http');
const fs = require('fs')
const url = require('url')

const items = [];

let ch = '中文'
console.log(`${ch}:Buffer.byteLength(${Buffer.byteLength(ch)});length(${ch.length})`);
let en = 'accd'
console.log(`${en}:Buffer.byteLength(${Buffer.byteLength(en)});length(${en.length})`);

http.createServer((req, res) => {


  switch (req.method) {
    case 'POST':
      let item = '';
      req.setEncoding('utf8');
      req.on('data', chunk => {
        console.log('chunk', chunk);
        item += chunk;
      })

      req.on('end', () => {
        items.push(item)

        res.end(JSON.stringify({ data: items }))
      })

      break;

    case 'GET':
      const str = JSON.stringify({ data: items });
      res.setHeader('Content-Length', Buffer.byteLength(str))
      res.setHeader('Content-Type', 'application/json')
      res.end(str)
      break;
    case 'DELETE':
      console.log(JSON.stringify())
      const urlObj = url.parse(req.url)
      const index = urlObj.pathname.substring(1);
      // req.on('data', chunk => {
      //   // console.log('chunk', chunk);
      //   // const index = JSON.parse(chunk).index;

      // })
      items.splice(index, 1)
      const str1 = JSON.stringify({ data: items });
      res.setHeader('Content-Length', Buffer.byteLength(str1))
      res.setHeader('Content-Type', 'application/json')
      res.end(str1)

      break;

    case 'PUT':
      const urlObj1 = url.parse(req.url)
      const index1 = urlObj1.pathname.substring(1);
      console.log('PUT', req.data);
      req.setEncoding('utf8');
      req.on('data', chunk => {
        console.log(chunk);
        items[index1] = chunk; 
      })

      req.on('end', () => {
        const str2 = JSON.stringify({ data: items });
        res.setHeader('Content-Length', Buffer.byteLength(str2))
        res.setHeader('Content-Type', 'application/json')
        res.end(str2)
      })

      break;




  }

}).listen(3333)

console.log('serve running at http://localhost:3333/')

