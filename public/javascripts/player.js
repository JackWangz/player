/**
 * Player.js
 * 2016/04/22 17:20
 * by JackWang
 */
(function() {
	
	var player = {};
	var YTPlayer = player.YTPlayer = '';

	var settings = {
		height: '640',
		width: '390'	
	};
	
	// Set up YouTube player 
	player.setPlayer = function() {
		YTPlayer = new YT.Player('player', {
			height: settings.height,
			width: settings.width,
			videoId: '',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	player.setVideo = function(videoId) {
		YTPlayer.cueVideoById({
			videoId: videoId,
			startSeconds: 0,
			suggestedQuality: 'large'  
		});
	};
	
	player.playVideo = function(videoId) {
		YTPlayer.loadVideoById({
			videoId: videoId,
			startSeconds: 0,
			suggestedQuality: 'large'  
		});
	};
	
	player.playList = function(listId) {
		YTPlayer.loadPlaylist({
			list: listId,
			startSeconds: 0,
			suggestedQuality: 'large'  
		});
	};

	function onPlayerReady(event) {
		event.target.playVideo();
	}

	function onPlayerStateChange(event) {
		// console.log('state changed');
	}

	function stopVideo() {
		YTPlayer.stopVideo();
	}


	// Expose module
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = player;
	}
	else {
		if (typeof define === 'function' && define.amd) {
			define([], function() {
				return player;
			});
		}
		else {
			window.player = player;
		}
	}
})();