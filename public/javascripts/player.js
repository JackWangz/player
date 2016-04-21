var player;



function setPlayer() {
    var tag = document.createElement('script');
    
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady() {
    console.log(123);
		player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: 'M7lc1UVf-VE',
			events: {
	            'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
          	}
		});
	}

	function onPlayerReady(event) {
	
		// event.target.playVideo();
	}

	var done = false;
	function onPlayerStateChange(event) {
		// console.log(player.getVideoLoadedFraction());
		// if (event.data == YT.PlayerState.PLAYING && !done) {
		// 	done = true;
		// 	player.loadPlaylist({
		// 						 list: '小幸運',
		// 						 listType: 'search',
		// 						 index: 0,
		// 						 startSeconds: 0,
		// 						 suggestedQuality: 'small' });
								 
		// 	console.log(player.getVideoLoadedFraction());
		// }
	}

	function stopVideo() {
		player.stopVideo();
	}
}

function setVideo(vId) {
    player.cueVideoById({
      videoId: vId,
      startSeconds: 0,
      suggestedQuality: 'large'  
    });
}