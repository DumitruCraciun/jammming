function Playlist({ playlistName, playlistTracks, onRemoveTrack, onNameChange, onSave }) {
  const handleRemoveTrack = (track) => {
    onRemoveTrack(track);
  };

  return (
    <div className="playlist">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="Playlist Name"
      />
      <div className="playlist-tracks">
        {playlistTracks.map(track => (
          <div 
            key={track.id} 
            className="track"
            onClick={() => handleRemoveTrack(track)}
          >
            <div className="track-info">
              <strong>{track.name}</strong>
              <p>{track.artist} | {track.album}</p>
            </div>
            <button 
              className="remove-btn"
              onClick={(e) => e.stopPropagation()}
            >
              -
            </button>            
          </div>
        ))}
      </div>
      <button onClick={onSave} className="save-btn">
        Save to Spotify
      </button>
    </div>
  );
}

export default Playlist;