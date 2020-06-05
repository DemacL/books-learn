const http = require('http');
const url = require('url')

const items = [{ id: 1, name: '郦道元', production: '《水经注》' },
{ id: 2, name: '张仲景', production: '《伤寒杂病论》' },
{ id: 3, name: '宋应星', production: '《天工开物》' }];

http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      const urlObj = url.parse(req.url)
      const delayTime = ~~(Math.random() * 5) * 1000;
      if (urlObj.pathname !== '/favicon.ico') {
        if (urlObj.pathname === '/random') {
          const randomIndex = ~~(Math.random() * 3)
          const str = JSON.stringify(randomIndex);
          console.log(str);
          res.end(str)
        } else {
          const index = urlObj.pathname.substring(1);
          const obj = items[index - 1];
          obj.delay = delayTime;
          const str = JSON.stringify(obj);
          res.setHeader('Content-Length', Buffer.byteLength(str))
          res.setHeader('Content-Type', 'application/json')
          setTimeout(() => {
            res.end(str)
          }, delayTime);
        }
      }
      break;
  }
}).listen(3333)

console.log('test api serve running at http://localhost:3333/')

