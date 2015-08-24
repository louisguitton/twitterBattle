var express = require('express');
var router = express.Router();




/* GET profile page.
we will want this protected so you have to be logged in to visit
we will use route middleware to verify this (the isLoggedIn function) */
router.get('/', isLoggedIn, function(req, res) {
	res.render('createBattle.jade');
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

var Battle            = require('../scripts/models/battle');


/*

function saveBattle(title, description, trackedWord_1, trackedWord_2, done) {

    var newBattle = new Battle();

    newBattle.title   = title;
    newBattle.description   = description;
    newBattle.streams[0].trackedWords[0]   = trackedWord_1;
    newBattle.streams[1].trackedWords[0]   = trackedWord_2;


            // save the user
            newBattle.save(function(err) {
                if (err)
                    throw err;
                return done(null, newBattle);
            });
        };
        */