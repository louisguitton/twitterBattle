var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var Battle = require('./scripts/models/battle');

var fight = new Battle({
	title: 'combat',
	description: 'trial by combat',
	streams: [{
		trackedWords: ['Tyrion']
	}, {
		trackedWords: ['Clegane']
	}],
});

fight.save(function(err) {
	if (err) throw err;

	console.log('User saved successfully!');
});