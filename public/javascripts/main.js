var app = angular.module('Player', []);

app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'https://youtu.be/**',
		'https://www.youtube.com/**',
		'https://i.ytimg.com/vi/**'
	]);
});

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
		// {videoId: 'tntOCGkgt98',
		//  videoTitle: 'Funny Cats ',
		//  videoUrl: 'https://youtu.be/aF4Icl31Ock',
		//  channelId: 'UCMW0kSYo44uRxvE21JqEWTQ',
		//  channelTitle: 'Forget Your Sadness'}
		];

	// Change the current video
	menu.changeVideo = function(src) {
		if(src.kind == 'video') {
			player.playVideo(src.videoId);
		} else if (src.kind == 'playlist') {
			console.log(src.playlistId);
			player.playList(src.playlistId);
		}
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
			videoList.splice(0, videoList.length);
			// console.log(response.result.items);
			
			for(var i = 0; i < response.result.items.length; i++) {
				var item = response.result.items[i];
				
				// Handle different kind of results 
				if(item.id.kind == 'youtube#video') {
					videoList.push({
						kind        : item.id.kind.substr(8),
						videoId     : item.id.videoId,
						videoTitle  : item.snippet.title,
						videoUrl    : 'https://youtu.be/'+item.id.videoId,
						channelId   : item.snippet.channelId,
						channelTitle: item.snippet.channelTitle,
						thumbnails: {
							default : item.snippet.thumbnails.default.url,
							medium  : item.snippet.thumbnails.medium.url,
							high    : item.snippet.thumbnails.high.url
						}
					});
				} else if(item.id.kind == 'youtube#playlist') {
					videoList.push({
						kind         : item.id.kind.substr(8),
						playlistId   : item.id.playlistId,
						playlistTitle: item.snippet.title,
						playlistUrl  : 'https://www.youtube.com/playlist?list='+item.id.playlistId,
						channelId    : item.snippet.channelId,
						channelTitle : item.snippet.channelTitle,
						thumbnails: {
							default : item.snippet.thumbnails.default.url,
							medium  : item.snippet.thumbnails.medium.url,
							high    : item.snippet.thumbnails.high.url
						}
					});
				} else if(item.id.kind == 'youtube#channel') {
				} else {
					console.log('undefined kind');
				}
				

			}
			console.log(videoList);
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

});
