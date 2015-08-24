/*
 AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT)
 */

var express = require('express');
var router = express.Router();

var passport = require('../scripts/config/passport');


/* GET page to link a local account. */
router.get('/local', function(req, res) {
	console.log('get connect local');
	res.render('connect-local.jade', {
		message: req.flash('loginMessage')
	});
});

/* POST local account to link with. */
router.post('/local', passport.authenticate('local-signup', { // authorize
	successRedirect: '../profile', // redirect to the secure profile section
	failureRedirect: '/local', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

/* send to facebook to link an account. */
router.get('/facebook', passport.authorize('facebook', {
	scope: 'email'
}));

/* handle the callback after facebook has authorized the user. */
router.get('/facebook/callback',
	passport.authorize('facebook', {
		successRedirect: '../profile',
		failureRedirect: '/'
	}));

/* send to twitter to link an account. */
router.get('/twitter', passport.authorize('twitter', {
	scope: 'email'
}));

/* handle the callback after twitter has authorized the user. */
router.get('/twitter/callback',
	passport.authorize('twitter', {
		successRedirect: '../profile',
		failureRedirect: '/'
	}));


/* send to google to link an account. */
router.get('/google', passport.authorize('google', {
	scope: ['profile', 'email']
}));

/* the callback after google has authorized the user. */
router.get('/google/callback',
	passport.authorize('google', {
		successRedirect: '../profile',
		failureRedirect: '/'
	}));

module.exports = router;