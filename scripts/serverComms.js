var serverComms = function(server) {
	// ==================================================
	// Twitter.JS
	var T = require('./twitter');

	// ==================================================
	// Socket.io (1/2) = a server that integrates with (or mounts on) the Node.JS HTTP Server
	var io = require('socket.io')(server);

	var stream_1 = T.stream('statuses/filter', {
		track: ['justinbieber', 'Bieber', 'Justin Bieber'],
		language: 'en'
	});

	var count_1 = 0;

	var notEmptyTrackers = [1, 2];

	stream_1.on('tweet', function(tweet_1) {
		// console.log(tweet_1.text);
		count_1 += 1;
		io.emit('newTweet_1', {
			tweet: tweet_1,
			count: count_1
		});
		io.emit('newTweet', notEmptyTrackers);
	})

	var stream_2 = T.stream('statuses/filter', {
		track: ['barackobama', 'Obama', 'Barack Obama'],
		language: 'en'
	});

	var count_2 = 0;

	stream_2.on('tweet', function(tweet_2) {
		// console.log(tweet_2.text);
		count_2 += 1;
		io.emit('newTweet_2', {
			tweet: tweet_2,
			count: count_2
		});
		io.emit('newTweet', notEmptyTrackers);

	})
}


module.exports = serverComms;