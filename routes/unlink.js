/*
UNLINK ACCOUNTS
used to unlink accounts. for social accounts, just remove the token
for local account, remove email and password
user account will stay active in case they want to reconnect in the future
*/

var express = require('express');
var router = express.Router();


// local -----------------------------------
router.get('/local', function(req, res) {
	var user = req.user;
	user.local.email = undefined;
	user.local.password = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
});

// facebook -------------------------------
router.get('/facebook', function(req, res) {
	var user = req.user;
	user.facebook.token = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
});

// twitter --------------------------------
router.get('/twitter', function(req, res) {
	var user = req.user;
	user.twitter.token = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
});

// google ---------------------------------
router.get('/google', function(req, res) {
	var user = req.user;
	user.google.token = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
});

module.exports = router;