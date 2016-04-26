(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var player = require('./player');

window.player = player;
//http://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined

},{"./player":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
