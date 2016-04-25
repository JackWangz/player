var app = angular.module('Player', []);

function loadAndPlayMusic(songItem, songPath) {
	var audio = $('#player'),
		currentSong = $('.playing');

	currentSong.removeClass('playing');
	songItem.addClass('playing');

	audio.attr('src', songPath);
	audio.load();
	audio.trigger('play');
}

function loadLyrics() {

}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.
  // var url = 'http://updates.html5rocks.com';

  // var xhr = createCORSRequest('GET', url);
  // if (!xhr) {
  //   alert('CORS not supported');
  //   return;
  // }

	var url = 'https://www.google.com.tw/';
	var xhr = createCORSRequest('GET', url);
	xhr.setRequestHeader('Access-Control-Allow-Origin', url);
	xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	xhr.setRequestHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	// xhr.send();

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function httpGetAsync(url, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	}
	xmlHttp.open('GET', url, true);
	xmlHttp.send(null);
}

// Menu Controller
app.controller('MenuController', ['$scope', function($scope) {
	var menu = this;

	$scope.videoList = [
		{videoId: 'tntOCGkgt98',
		 videoTitle: 'Funny Cats ',
		 videoUrl: 'https://youtu.be/aF4Icl31Ock',
		 channelId: 'UCMW0kSYo44uRxvE21JqEWTQ',
		 channelTitle: 'Forget Your Sadness'}
		];

	// Change the current video
	menu.changeVideo = function(video) {
		player.setVideo(video.videoId);
		// Play music
		// loadAndPlayMusic(target, filePath);
	};
}]);

// Search Controller
app.controller('SearchController', ['$scope', function($scope) {
	var search = this;
	
	search.searchVideo = function(e) {
		var q = $('#query').val();
		var request = gapi.client.youtube.search.list({
			q: q,
			part: 'snippet'
		});

		request.execute(function(response) {
			var videoList = $scope.$$prevSibling.videoList;
			// clear list
			// videoList = [];
			console.log(response.result.items);
			for(var i = 0; i < response.result.items.length; i++) {
				var item = response.result.items[i];
				videoList.push({
					videoId: item.id.videoId,
					videoTitle: item.snippet.title,
					videoUrl: 'https://youtu.be/'+item.id.videoId,
					channelId:  item.snippet.channelId,
					channelTitle: item.snippet.channelTitle,
				});
			}
			
			var vId = response.result.items[0].id.videoId;
			$scope.$apply();
			// Set video from searching result
			// player.setVideo(vId);
		});
	};
}]);

/*
 *
 *	JQuery
 *
 */
$(document).ready(function() {
	var songItem = $('.songItem'),
		audioPlayer = $('#player');

	// Ended event
	// audioPlayer.on('ended', function(event) {
	// 	event.preventDefault();

	// 	var nextSong = currentSong.parents('li').next('li').find('span a'),
	// 		nextSongPath = nextSong.data('path');
	// 	// Play next song
	// 	loadAndPlayMusic(nextSong, nextSongPath);
	// 	loadLyrics();
	// });


	function httpGet(theUrl){
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				return xmlhttp.responseText;
			}
		}
		xmlhttp.open("GET", theUrl, true);
		xmlhttp.send();    
	}

// httpGet("http://stackoverflow.com/");
	// httpGetAsync('http://www.metrolyrics.com/search.html?search=craig+david', function(){
	// 	console.log(123);
	// });
});
