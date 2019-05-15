import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {PlayList} from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'searchResults': [], 
      'playlistName': 'Jammming Playlist',
      'playlistTracks': []
      } 
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  } // End of constructor

    addTrack(track) {
      let currentPlaylist = this.state.playlistTracks;
      if (currentPlaylist.find(pickedTrack => pickedTrack.id === track.id)) {
        return currentPlaylist;} else {
        currentPlaylist.push(track);
        this.setState({playlistTracks: currentPlaylist});
        }
    }

    removeTrack(track) {
      let currentPlaylist = this.state.playlistTracks;
      let cutPlaylist = currentPlaylist.filter(lostTrack => lostTrack.id !== track.id);
      this.setState({playlistTracks: cutPlaylist})
    }
    
    updatePlaylistName(name) {
      this.setState({playlistName: name});
    }

    savePlaylist() {
      let trackURIs = []
      for (let i = 0; i < this.state.playlistTracks.length; i++) {
        trackURIs.push(this.state.playlistTracks[i].uri) }
      Spotify.savePlaylist(this.state.playlistName, trackURIs)
      this.setState({'playlistName': 'Jammming Playlist',
      'playlistTracks': []})
    }

    search(term) {
      Spotify.search(term).then(tracks => {
        this.setState({searchResults: tracks})
      });
    }

    render () {
      return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar 
            onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults searchResults= {this.state.searchResults} onAdd={this.addTrack} />
              <PlayList 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
            </div>
          </div>
        </div>
      )
    };
  } // End of Class

export default App;
//don't forget to import components!