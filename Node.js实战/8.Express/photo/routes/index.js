var express = require('express');
var router = express.Router();

// const photos = require('./photos');
// console.log('photos data', photos);

const photos = [];

photos.push({
  name: 'Calm Sunset in El Nido',
  path: 'F:\\code\\books-learn\\Node.js实战\\8.Express\\photo\\public\\images\\Calm Sunset in El Nido.jpg'
}, {
  name: 'BRIDGE TO NOWHERE',
  path: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/hot_search/mark-icon-3@1x-fdb050afea.png'
})

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function(req, res, next) {
  res.render('photos', { photos: photos  });
});

// exports.list = function (req, res) {
//   res.render('photos', { photos: photos });
// }




module.exports = router;
