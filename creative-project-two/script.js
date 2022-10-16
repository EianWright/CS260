var request = require('request'); // "Request" library

var config = require('./config');

var client_id = config.client_id;
var client_secret = config.client_secret;

var token;

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    token = body.access_token;
  }
});

document.getElementById("goButton").addEventListener("click", function (event) {
  event.preventDefault();

  let name = document.getElementById('name').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  let lyricURL = "https://taylorswiftapi.herokuapp.com/get";

  if (type === 'album') {
    lyricURL = lyricURL + "?album=" + name;
  }
  else if (type === 'song') {
    lyricURL = lyricURL + "?song=" + name;
  }

  fetch(lyricURL)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);

      var albumName = json.album;
      var songName = json.song;
      var randomLyric = json.quote;

      let formattedAlbumName = json.album.trim().replaceAll(' ', '%20');
      let formattedTrackName = json.song.trim().replaceAll(' ', '%20');

      var options = {
        url: 'https://api.spotify.com/v1/search?type=track&q=artist:Taylor%20Swift%20album:' + formattedAlbumName + '%20track:' + formattedTrackName + '&limit=1',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };

      request.get(options, function (error, response, body) {

        let json = body.tracks;
        let track = json.items[0];
        let album = track.album;
        console.log(track);
        let toReplace = document.getElementById('results');
        let result = "";
        let albumPicture = album.images[0];
        result += '<img class="album-cover-art" src="' + albumPicture.url + '" height="' + albumPicture.height + '" width="' + albumPicture.width + '">';
        result += '<br>'
        result += '<p>Album: ' + albumName + ' Song: ' + songName + ' Lyric: ' + randomLyric + '</p>';
        toReplace.innerHTML = result;
      });
    });
});