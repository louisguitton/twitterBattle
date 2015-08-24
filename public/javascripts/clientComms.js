var socket = io();
var trackedWords = {
	"1": "#bieber",
	"2": "#obama",
	"3": "",
	"4": "",
	"5": "",
	"6": ""
};
var counts = {
	"1": 0,
	"2": 0,
	"3": 0,
	"4": 0,
	"5": 0,
	"6": 0
};
var arrayOfTrackers = [1, 2];

function initTrackers(notEmptyTrackers) {
	for (var i in notEmptyTrackers) {
		var prop = notEmptyTrackers[i];
		console.log(prop);

		$('#' + prop + ' .name').html(trackedWords[prop]);

		initListener(prop, notEmptyTrackers);

	}

	d3.select(".chart")
		.selectAll("div")
		.data(notEmptyTrackers)
		.enter().append("div")
		.text(function(d) {
			return trackedWords[d];
		});


}

function initListener(trackerNumber) {
	socket.on('newTweet_' + trackerNumber, function(data) {
		counts[trackerNumber] = data.count;
		$('#' + trackerNumber + ' .count').html(counts[trackerNumber]);
		$('#' + trackerNumber + ' .tweets').prepend('<li>' + data.tweet.text);
	})

	console.log('Tracker ' + trackerNumber + ' initialized');
}

socket.on('newTweet', function(notEmptyTrackers) {
	var scores = [];
	for (var i in notEmptyTrackers) {
		var prop = notEmptyTrackers[i];
		scores.push(counts[prop]);
	}
	console.log(scores + ' ' + notEmptyTrackers);

	var x = d3.scale.linear().domain([0, d3.max(scores)]).range([0, 420]);
	// console.log('linear scale: ' + x(d3.max(scores)));

	d3.select(".chart")
		.selectAll("div")
		.data(notEmptyTrackers)
		.style("width", function(d) {
			console.log(x(counts[d]));
			return x(counts[d]) + "px";
		});
});


initTrackers(arrayOfTrackers);

// socket.on('newTracker', initTrackers(arrayOfTrackers) + socket.emit(refreshTableOfNotEmptyTrackers));