// use HTML5 new feature with the data-* attributes
// https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes
var battleWatched = JSON.parse(document.getElementById('battle').dataset.battle);

console.log(battleWatched);

/*
{
	__v: 0
	_id: "55dce4f382f1daa837117c02"
	created_by: "55dce4eb82f1daa837117c01"
	description: "2 of the biggest Twitter accounts"
	streams: Array[2]
	title: "Bieber vs Obama"
	__proto__: Object
}
*/

var socket = io();
var trackers = battleWatched.streams;


var counts = [];

initTrackers(trackers, counts);

socket.on('newTweet', function() {
	refreshTrackers(trackers, counts)
});


//support functions
function initTrackers(trackers, counts) {
	console.log('INITIALISATION');

	var notEmptyTrackers = trackers.length;

	for (var i = 0; i < notEmptyTrackers; i++) {
		$('#' + i + ' .name').html(trackers[i].trackedWords);
		initListener(i, counts);
	}

	console.log(counts);
	d3.select(".chart")
		.selectAll("div")
		.data(trackers)
		.enter().append("div")
		.text(function(i) {
			return i.trackedWords;
		});

};

// for (var i = 0; i < notEmptyTrackers; i++)
function initListener(trackerNumber, counts) {
	socket.on('newTweet_' + trackerNumber, function(data) {
		// HERE
		counts[trackerNumber] = data.count;
		$('#' + trackerNumber + ' .count').html(counts[trackerNumber]);
		$('#' + trackerNumber + ' .tweets').prepend('<li>' + data.tweet.text);
	})

	console.log('Tracker ' + trackerNumber + ' initialized');
};

function refreshTrackers(trackers, counts) {

	console.log(counts);
	var x = d3.scale.linear().domain([0, d3.max(counts)]).range([0, 420]);
	// console.log('linear scale: ' + x(d3.max(scores)));

	d3.select(".chart")
		.selectAll("div")
		.data(counts)
		.style("width", function(d) {
			return x(d) + "px";
		});
};