// src/utils/MusicService.js
// Deezer API - fără token, fără autentificare

const LASTFM_API_KEY = '58490484ff1c1df3d1024508513b24ce';
const LASTFM_API = 'https://ws.audioscrobbler.com/2.0/';

const MusicService = {
  // Caută melodii după termen
  async search(term) {
    try {
        const url = `${LASTFM_API}?method=track.search&track=${encodeURIComponent(term)}&api_key=${LASTFM_API_KEY}&format=json&limit=15`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.results?.trackmatches?.track) return [];
        
        return data.results.trackmatches.track.map(track => ({
          id: track.mbid || track.name,
          name: track.name,
          artist: track.artist,
          album: 'Unknown',
          uri: track.url
        }));
        } catch (error) {
          console.error('Eroare căutare Last.fm:', error);
          return [];
        }
      },

  // Salvează playlist (local, pentru că Deezer nu permite creare playlist prin API public)
  async savePlaylist(name, trackUris) {
    // Deezer API public nu suportă creare playlist
    // Așa că salvăm local și oferim export
    const playlist = {
      id: Date.now(),
      name: name,
      tracks: trackUris,
      date: new Date().toISOString()
    };
    
    // Salvează în localStorage
    const savedPlaylists = JSON.parse(localStorage.getItem('jammming_playlists') || '[]');
    savedPlaylists.push(playlist);
    localStorage.setItem('jammming_playlists', JSON.stringify(savedPlaylists));
    
    console.log('Playlist salvată local:', playlist);
    return playlist;
  },

  // Obține toate playlist-urile salvate
  getSavedPlaylists() {
    return JSON.parse(localStorage.getItem('jammming_playlists') || '[]');
  }
};

export default MusicService;