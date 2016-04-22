/**
 * Player.js
 * 2016/04/22 17:20
 * by JackWang
 */
(function() {
	
	var player = {};
	var YTPlayer = player.YTPlayer = '';

	// Set up YouTube player 
	player.setPlayer = function() {
		YTPlayer = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: 'M7lc1UVf-VE',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	player.setVideo = function(vId) {
		YTPlayer.cueVideoById({
			videoId: vId,
			startSeconds: 0,
			suggestedQuality: 'large'  
		});
	}

	function onPlayerReady(event) {
		event.target.playVideo();
	}

	function onPlayerStateChange(event) {
		console.log('state changed');
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