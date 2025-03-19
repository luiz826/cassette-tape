import React, { useState } from 'react';
import YouTubeSearch from './YouTubeSearch';

const PlaylistCreator = () => {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [tracks, setTracks] = useState([]);
  const [shareableLink, setShareableLink] = useState('');

  const addTrack = (track) => {
    setTracks((prev) => [...prev, track]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build request body
    const body = {
      playlistName,
      description,
      tracks
    };
    try {
      const resp = await fetch('http://localhost:8000/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await resp.json();
      if (resp.ok) {
        const link = `${window.location.origin}/play/${data.shareableLinkId}`;
        setShareableLink(link);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Your Cassette Tape Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <textarea
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <YouTubeSearch onAddTrack={addTrack} />
          <button type="submit" style={{ marginTop: "1rem" }}>Save Playlist</button>
        </form>
      </div>

      {tracks.length > 0 && (
        <div className="card">
          <h3>Selected Videos</h3>
          {tracks.map((track, i) => (
            <div key={i} className="track-card">
              <p style={{ fontWeight: "bold" }}>{track.title}</p>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>{track.channelTitle}</p>
            </div>
          ))}
        </div>
      )}

      {shareableLink && (
        <div className="card">
          <h3>Shareable Link</h3>
          <p>Send this link to a friend!</p>
          <a href={shareableLink}>{shareableLink}</a>
        </div>
      )}
    </div>
  );
};

export default PlaylistCreator;
