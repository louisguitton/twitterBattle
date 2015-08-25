/*
UNLINK ACCOUNTS
used to unlink accounts. for social accounts, just remove the token
for local account, remove email and password
user account will stay active in case they want to reconnect in the future
*/

var express = require('express');
var router = express.Router();

var User = require('../scripts/models/user');



// local -----------------------------------
router.get('/local', function(req, res) {
	var user = req.user;
	user.local.email = undefined;
	user.local.password = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
	deleteUser(req, res);
});

// facebook -------------------------------
router.get('/facebook', function(req, res) {
	var user = req.user;
	user.facebook.token = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
	deleteUser(req, res);
});

// twitter --------------------------------
router.get('/twitter', function(req, res) {
	var user = req.user;
	user.twitter.token = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
	deleteUser(req, res);
});

// google ---------------------------------
router.get('/google', function(req, res) {
	var user = req.user;
	user.google.token = undefined;
	user.save(function(err) {
		res.redirect('../profile');
	});
	deleteUser(req, res);
});

module.exports = router;

function deleteUser(req, res) {
	var u = req.user;
	if (u.local.email == undefined && u.facebook.token == undefined && u.twitter.token == undefined && u.google.token == undefined) {
		User.findByIdAndRemove(u._id, function(err) {
			if (err) throw err;
			// we have deleted the user
			console.log('User deleted!');
		});
	}

};