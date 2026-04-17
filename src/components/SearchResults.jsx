function SearchResults({ tracks, onAddTrack }) {
  const handleAddTrack = (track) => {
    onAddTrack(track);
  };

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <div className="tracks-list">
        {tracks.map(track => (
          <div 
            key={track.id} 
            className="track"
            onClick={() => handleAddTrack(track)}
          >
            <div className="track-info">
              <strong>{track.name}</strong>
              <p>{track.artist} | {track.album}</p>
            </div>
            <button 
              className="add-btn"
              onClick={(e) => e.stopPropagation()}
            >
              +
            </button>            
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;