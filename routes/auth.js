/*
AUTHENTICATE (FIRST LOGIN)
*/

var express = require('express');
var router = express.Router();

var passport = require('../scripts/config/passport');


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('Hello world'); // I'd like to see the conflict between '/auth' in routes/index.js and '/' in routes/auth.js
});

/* GET login form. */
router.get('/login', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('login.jade', {
		message: req.flash('loginMessage')
	});
});

/* POST to process the login form. */
router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile', // redirect to the secure profile section
	failureRedirect: '/login', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

/* GET signup form. */
router.get('/signup', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('signup.jade', {
		message: req.flash('signupMessage')
	});
});

/* POST to process the signup form. */
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile', // redirect to the secure profile section
	failureRedirect: '/signup', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

/* Route for facebook authentication and login. */
router.get('/facebook', passport.authenticate('facebook'));

/* handle the callback after facebook has authenticated the user. */
router.get('/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

/* Route for twitter authentication and login. */
router.get('/twitter', passport.authenticate('twitter'));

/* handle the callback after twitter has authenticated the user. */
router.get('/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

/* Route for google authentication and login. */
router.get('/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

/* Handle the callback after google has authenticated the user. */
router.get('/google/callback',
	passport.authenticate('google', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));


module.exports = router;