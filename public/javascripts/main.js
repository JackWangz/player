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

app.controller('MenuController', function(){
	var menu = this;

	menu.songList = [
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Miss you', singer:'No Name'	  , filepath:'resources/藍色蝴蝶Remix.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'},
		{name:'Insomnia', singer:'Craig David', filepath:'resources/Insomnia.mp3'}];

	// Change the current song
	menu.changeSong = function(e) {
		var target = $(e.target),
			filePath = target.data('path');
		// Play music
		loadAndPlayMusic(target, filePath);
	};
});


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


function httpGet(theUrl)
{
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
