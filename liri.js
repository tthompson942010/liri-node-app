var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify');
var fs = require('fs');
var keys = require('./keys.js');

var command = process.argv[2];
var media = process.argv[3];
var limit = process.argv[4];

var printTweets = function(){
	var params = {xchainxsmokerx: 'nodejs'};
	var userkey = keys.twitterKeys
	var client = new Twitter(userkey)
	console.log(userkey)
	client.get('statuses/user_timeline', {screen_name: 'xchainxsmokerx'}, function(error, tweets, response){
		if (error) {
			console.log('Error occured: ' + error);
			return;
		};
		nicetweets = JSON.stringify(tweets, null, 2);

		for(i = 0; i < 20; i++){
			console.log(tweets[i].text);
		}
		// console.log(nicetweets);
		// console.log(response);
	});


}
// Spotify function
	var printSpotify = function(song, limit){
	Spotify.search({ type: 'track', query: song }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }

	    for (i = 0; i < limit; i++){
	 		var refnumber = data.tracks.items[i]
			console.log(refnumber.preview_url)
	 		console.log('"' + refnumber.name + '"'  + ", track " + refnumber.track_number + " on " + refnumber.album.name);
		 		for(j = 0; j < refnumber.artists.length; j++){
					console.log(refnumber.artists[j].name);
		   		}
		   	console.log('---------------------------')
	    };
	});
	}

var printMovie = function(movie){
var queryUrl = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=short&tomatoes=true&r=json';
	request(queryUrl, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log("Title: " + JSON.parse(body)["Title"]);
				console.log("Release Year: " + JSON.parse(body)["Year"]); 
				console.log("Country: " + JSON.parse(body)["Country"]);
				console.log("Language: " + JSON.parse(body)["Language"])
				console.log("Plot: " + JSON.parse(body)["Plot"])
				console.log("Actors: " + JSON.parse(body)["Actors"])
				console.log("IMDb Rating: " + JSON.parse(body)["imdbRating"]);
				console.log("RT Rating: " + JSON.parse(body)["tomatoRating"])
				console.log("Rotten Tomatoes Link: " + JSON.parse(body)["tomatoURL"])
			}
	});
}


var doIt = function(){
	fs.readFile('random.txt', 'utf8', function(error, data){
		var dataArr = data.split(',');
		media = dataArr[1];
		command = dataArr[0];
		printSpotify(media, limit);
	})
}
switch(command){
	
	case "my-tweets":
	printTweets();
	break;

	case "spotify-this-song":
	if( media == undefined){
		media = "I Saw the Sign"
	}
	if( limit == undefined){
		limit = "5"
	}
	printSpotify(media, limit);
	break;

	case "movie-this":
	if( media == undefined){
		media = "Mr. Nobody"
	}

	printMovie(media);
	break;

	case "do-what-it-says":
	doIt();
	if( limit == undefined){
		limit = "5"
	}	
	break;

    default: 
    console.log("Sorry, please try again.")
    break; 
}
