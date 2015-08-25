/*
UNLINK ACCOUNTS
used to unlink accounts. for social accounts, just remove the token
for local account, remove email and password
user account will stay active in case they want to reconnect in the future
*/

var express = require('express');
var router = express.Router();

var User = require('../scripts/models/user');
var Battle = require('../scripts/models/battle');



// local -----------------------------------
router.get('/local', function(req, res, next) {
	var user = req.user;
	user.local.email = undefined;
	user.local.password = undefined;
	user.save();
	next();
}, updateBattlesAndDeleteUser);

// facebook -------------------------------
router.get('/facebook', function(req, res, next) {
	var user = req.user;
	user.facebook.token = undefined;
	user.save();
	next();
}, updateBattlesAndDeleteUser);

// twitter --------------------------------
router.get('/twitter', function(req, res, next) {
	var user = req.user;
	user.twitter.token = undefined;
	user.save();
	next();
}, updateBattlesAndDeleteUser);

// google ---------------------------------
router.get('/google', function(req, res, next) {
	var user = req.user;
	user.google.token = undefined;
	user.save();
	next();
}, updateBattlesAndDeleteUser);

/* POST to delete user. */
router.post('/delete', function(req, res) {
	updateBattles(req, res, deleteUser(req, res));
});


module.exports = router;

function updateBattlesAndDeleteUser(req, res) {
	var u = req.user;
	console.log('user' + u);
	// if the user unlinked all of his accounts, 
	// delete hime from the db,
	// and delete the 'created_by' field from his battles
	if (u.local.email == undefined && u.facebook.token == undefined && u.twitter.token == undefined && u.google.token == undefined) {
		updateBattles(req, res, deleteUser(req, res));
	} else {
		// function(err) {	if (err) throw err;
		console.log('we go back to profile')
		res.redirect('../profile');
	}
};

function updateBattles(req, res) {
	Battle.find({
		created_by: req.user._id
	}, function(err, hisBattles) {
		if (err) throw err;
		console.log(hisBattles);

		for (x in hisBattles) {
			hisBattles[x].created_by = undefined;
			hisBattles[x].save(function(err) {
				if (err) throw err;

				console.log('Battle successfully updated!');
			});
		};
	});
};

function deleteUser(req, res) {
	User.findByIdAndRemove(req.user._id, function(err) {
		if (err) throw err;
		// we have deleted the user
		console.log('User deleted!');
	});
	console.log('we go home')
	res.redirect('../');
};