import './App.css';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Playlist from './components/Playlist';
// import Spotify from './utils/Spotify';
import MusicService from './utils/MusicService';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setIsLoading(true);
    console.log('Searching for:', term);
    const results = await MusicService.search(term);
    setSearchResults(results);
    setIsLoading(false);
    console.log('Search results:', results);
  };

  const addTrackToPlaylist = (track) => {
    // Verifică dacă melodia e deja în playlist
    if (!playlistTracks.find(existingTrack => existingTrack.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrackFromPlaylist = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
  };

  const handleSavePlaylist = async () => {
    const trackUris = playlistTracks.map(track => track.uri);
    // await Spotify.savePlaylist(playlistName, trackUris);
    const saved = await MusicService.savePlaylist(playlistName, trackUris);
    setPlaylistTracks([]);
    setPlaylistName('My Playlist');
    //alert('Playlist saved to Spotify!');
    alert(`Playlist "${saved.name}" saved with ${trackUris.length} songs!`);
  };

  return (
    <div className="App">
      <h1>🎵 Jammming 🎸</h1>
      <SearchBar onSearch={handleSearch} />

      {isLoading && <p>Loading...</p>}
      
      <div className="app-content">
        <SearchResults 
          tracks={searchResults} 
          onAddTrack={addTrackToPlaylist}
        />
        
        <Playlist 
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemoveTrack={removeTrackFromPlaylist}
          onNameChange={setPlaylistName}
          onSave={handleSavePlaylist}
        />
      </div>

      <footer className="app-footer">
        <p>© 2026 Jammming — Music Playlist Manager</p>
        <p>Built with React, JavaScript & Last.fm API by Dumitru Craciun</p>
      </footer>
    </div>
  );
}

export default App;