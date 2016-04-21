// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response.result.items[0].id.videoId);
    var vId = response.result.items[0].id.videoId;
    // $('#search-container').html('<pre>' + str + '</pre>');
    
    
    var tag = document.createElement('script');
    
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubeIframeAPIReady() {
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
    
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {

    }

    function stopVideo() {
      player.stopVideo();
    }
  });
}
