var express = require('express');
var router = express.Router();


// middleware
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Battle' });
});

module.exports = router;
