const clientID = '6064992ee9fc49969df673892f74fd37';
const redirectURI = 'http://localhost:3000/';

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {
    //Access Token has already been established
    if (accessToken) {
      return accessToken;
      
    }
    //Access Token has not been established but is in URL
    else if 
    (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
      // Redirects without token
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  }, // End of getAccessToken

  async search(term) {
    const accessToken  = this.getAccessToken();
    const fetcher = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    { headers: { Authorization: `Bearer ${accessToken}` } });

    const jsonResponse = await fetcher.json();
    const tracks = jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));

    return tracks;
  }, //End of search

  async savePlaylist(playlistName, URIs) {
    if (!playlistName || !URIs) { return };

    const accessToken = this.getAccessToken();
    const headers  = {Authorization: `Bearer ${accessToken}`};
    let userId;

    const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
    const jsonResponse = await response.json();
    userId = jsonResponse.id;
    const resonse2 = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name: playlistName })
    });
    const jsonresonse2 = await resonse2.json();
    let playlistID = jsonresonse2.id;
    fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ uris: URIs })
    });
  }, //End of savePlaylist


  async getUsersName() {
    
      const accessToken  = this.getAccessToken();
      const headers  = {Authorization: `Bearer ${accessToken}`};

      const response = await fetch('https://api.spotify.com/v1/me', { headers: headers });
      const jsonResponse = await response.json();
      const whoIsThis = await jsonResponse.display_name;
      console.log(whoIsThis);
      return whoIsThis    
  }



} //End of "Spotify"

export default Spotify;