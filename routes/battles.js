var express = require('express');
var router = express.Router();

var Battle = require('../scripts/models/battle');

/* GET My Battles page. */
router.get('/', function(req, res) {
	res.redirect('/battles/list');
});

/* GET My Battles page. */
router.get('/list', isLoggedIn, function(req, res) {
	Battle.find({
		created_by: req.user._id
	}, function(err, myBattles) {
		if (err) throw err;
		console.log(myBattles);
		var fullUrl = req.protocol + '://' + req.get('host') + '/watch';
		res.render('listBattles', {
			myBattles: myBattles,
			url: fullUrl
		});
	});
});

/* GET form to create a battle.
we will want this protected so you have to be logged in to create a Battle
we will use route middleware to verify this (the isLoggedIn function) 
*/
router.get('/create', isLoggedIn, function(req, res) {
	res.render('createBattle');
});

/* POST a new battle. */
router.post('/create', createBattle);


/* GET form to edit a battle. */
router.get('/edit', isLoggedIn, function(req, res) {

	var battle_id = req.query.id;

	Battle.find({
		_id: battle_id
	}, function(err, battleEdited) {
		if (err) throw err;

		res.render('editBattle', {
			battleEdited: battleEdited
		});
	});

});

/* POST an edit of a battle. */
router.post('/edit', isLoggedIn, function(req, res) {

	var battle_id = req.body.battle_id;

	Battle.find({
			_id: battle_id
		}, function(err, battleEdited) {
			battleEdited = battleEdited[0];
			console.log(battleEdited);
			battleEdited.title = req.body.title;
			battleEdited.description = req.body.description;
			battleEdited.streams[0].trackedWords = req.body.trackedWord_1;
			battleEdited.streams[1].trackedWords = req.body.trackedWord_2;

			battleEdited.save(function(err) {
				if (err) throw err;

				console.log('Battle successfully updated!');
				res.redirect('./list');
			});

		}

	)
});

/* POST to delete a battle. */
router.post('/delete', isLoggedIn, function(req, res) {

	var battle_id = req.query.id;
	Battle.findByIdAndRemove(battle_id, function(err) {
		if (err) throw err;

		// we have deleted the user
		console.log('Battle deleted!');
		res.redirect('./list');
	});
});

/* GET to start a battle. */
router.get('/start', isLoggedIn, function(req, res) {
	var battle_id = req.query.id;
	Battle.find({
		_id: battle_id
	}, function(err, battleToStart) {
		if (err) throw err;
		battleToStart = battleToStart[0];

		console.log(battleToStart.streams[0].trackedWords);
		console.log(battleToStart.streams[1].trackedWords);
		require('../scripts/serverComms2.js')(battleToStart);
		res.redirect('/watch?id='+battle_id);
	});
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('../auth');
}

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
		res.redirect('./list');
	}));
};