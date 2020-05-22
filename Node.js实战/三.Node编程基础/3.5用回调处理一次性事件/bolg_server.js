// 通过尽早返回减少嵌套
const http = require("http");
const fs = require("fs");

http.createServer(function (req, res) {
  getTitles(res);
}).listen(3333, () => {
  console.log('serve running at http://localhost:3333/')
});

function getTitles(res) {
  fs.readFile('./title.json', function (err, data) {
    if (err) return hadError(err, res);  //如果出错后面不再执行, 直接返回
    getTemplate(JSON.parse(data.toString()), res);
  })
}

function getTemplate(titles, res) {
  fs.readFile('./template.html', function (err, data) {
    if (err) return hadError(err, res);
    formatHtml(titles, data.toString(), res);
  })
}

function formatHtml(titles, templ, res) {
  const html = templ.replace('%', titles.join('</li><li>'));
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

function hadError(err, res) {
  console.log(err);
  res.end('Server error');
}