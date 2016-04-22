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
    // var str = JSON.stringify(response.result);
    var vId = response.result.items[0].id.videoId;
    // Set video from searching result
    player.setVideo(vId);
  });
}
