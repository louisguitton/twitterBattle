var serverComms = function(battleToStart) {
	// ==================================================
	// Twitter.JS
	var T = require('./twitter');

	var server = require('../bin/www');

	// ==================================================
	// Socket.io (1/2) = a server that integrates with (or mounts on) the Node.JS HTTP Server
	var io = require('socket.io').listen(server);

	var stream_0 = T.stream('statuses/filter', {
		track: [battleToStart.streams[0].trackedWords], //
		language: 'en'
	});

	var count_0 = 0;


	stream_0.on('tweet', function(tweet_0) {
		// console.log(tweet_1.text);
		count_0 += 1;
		io.emit('newTweet_0', {
			tweet: tweet_0,
			count: count_0
		});
		io.emit('newTweet');
	})

	var stream_1 = T.stream('statuses/filter', {
		track: [battleToStart.streams[1].trackedWords], //
		language: 'en'
	});

	var count_1 = 0;

	stream_1.on('tweet', function(tweet_1) {
		// console.log(tweet_2.text);
		count_1 += 1;
		io.emit('newTweet_1', {
			tweet: tweet_1,
			count: count_1
		});
		io.emit('newTweet');

	})
}


module.exports = serverComms;