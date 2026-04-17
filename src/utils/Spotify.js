// src/utils/Spotify.js

const token = import.meta.env.VITE_SPOTIFY_TOKEN;

const Spotify = {
  async search(term) {
    console.log('Caută:', term);
    
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      console.log('Răspuns API:', data);
      
      if (!data.tracks || !data.tracks.items) {
        return [];
      }
      
      return data.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    } catch (error) {
      console.error('Eroare căutare:', error);
      return [];
    }
  },

  async savePlaylist(name, trackUris) {
    // Vom implementa mai târziu
    console.log('Salvează playlist:', name, trackUris);
    alert('Funcționalitatea de salvare va fi disponibilă curând!');
  }
};

export default Spotify;