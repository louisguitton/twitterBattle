var express = require('express');
var router = express.Router();

var Battle = require('../scripts/models/battle');

// middleware
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Twitter Battle'
  });
});

/* GET login dashboard. */
router.get('/auth', function(req, res) {
  res.render('authenticate');
});

/* GET profile page.
we will want this protected so you have to be logged in to visit
we will use route middleware to verify this (the isLoggedIn function) */
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    user: req.user // get the user out of session and pass to template
  });
});

/* GET logout page. */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

/* GET My Battles page. */
router.get('/mybattles', isLoggedIn, function(req, res) {
  Battle.find({
    created_by: req.user._id
  }, function(err, mybattles) {
    if (err) throw err;

    var myBattles = mybattles;
    console.log(myBattles);

    res.render('mybattles', {
        myBattles: myBattles[0]
    });
  });
});

module.exports = router;


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}