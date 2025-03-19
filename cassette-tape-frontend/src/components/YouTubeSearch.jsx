// src/components/YouTubeSearch.jsx
import React, { useState } from 'react';

const YouTubeSearch = ({ onAddTrack }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Make sure your back-end route is correct
    const url = `http://localhost:8000/api/playlists/search_youtube?query=${encodeURIComponent(query)}`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        console.error("Error fetching from server:", resp.status);
        return;
      }
      const data = await resp.json();
      // Data should be an array of { videoId, title, channelTitle, thumbnail }
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>Search YouTube</h3>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Type a song or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results" style={{ marginTop: "1rem" }}>
        {results.map((item) => (
          <div key={item.videoId} className="search-result-card">
            <img src={item.thumbnail} alt={item.title} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "600" }}>{item.title}</p>
              <p style={{ fontSize: "0.85rem", color: "#666" }}>
                Channel: {item.channelTitle}
              </p>
            </div>
            <button onClick={() => onAddTrack(item)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearch;
