const clientID = '6064992ee9fc49969df673892f74fd37';
const redirectURI = 'https://tremckinley_jammmed_you.surge.sh';

let accessToken;
let expiresIn;
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if 
    (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
console.log(window.location.href.match(/access_token=([^&]*)/))
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];

      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  }, // End of getAccessToken

  search(term) {
    const accessToken  = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {return response.json()
    }).then(jsonResponse => {
      const tracks = jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
      return tracks
    });
  },//End of search

  savePlaylist(playlistName, URIs) {
    if (!playlistName || !URIs) {
     return 
    }

    const accessToken = this.getAccessToken();
    const headers  = {Authorization: `Bearer ${accessToken}`}
    let userId;

    return fetch(
      'https://api.spotify.com/v1/me', 
      {headers: headers}
    ).then(response => {return response.json()
    }).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()).then(jsonResponse => {
        let playlistID = jsonResponse.id;
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({uris: URIs})
          })
        })
      } 
    )
  } //End of savePlaylist


} //End of "Spotify"

export default Spotify;