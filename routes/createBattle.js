var express = require('express');
var router = express.Router();

var Battle = require('../scripts/models/battle');



/* GET form to create a battle.
we will want this protected so you have to be logged in to create a Battle
we will use route middleware to verify this (the isLoggedIn function) 
*/
router.get('/', isLoggedIn, function(req, res) {
	res.render('createBattle.jade');
});

/* POST a new battle. */
router.post('/', createBattle);

module.exports = router;


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('../auth');
};

function createBattle(req, res, next) {
	var title = req.body.title;
	var description = req.body.description;
	var trackedWord_1 = req.body.trackedWord_1;
	var trackedWord_2 = req.body.trackedWord_2;

	var newBattle = new Battle({
		title: title,
		description: description,
		streams: [{
			trackedWords: trackedWord_1
		}, {
			trackedWords: trackedWord_2
		}]
	});

	console.log(newBattle);
	console.log(req.user);

	// most important line!
	newBattle.saveAuthor(req.user, newBattle.save(function(err) {
		if (err)
			throw err;
		res.redirect('../mybattles');
	}));
};