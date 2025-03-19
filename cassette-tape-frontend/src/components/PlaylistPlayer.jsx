import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistPlayer = () => {
  const { idOrSlug } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const resp = await fetch(`http://localhost:8000/api/playlists/${idOrSlug}`);
        if (!resp.ok) {
          console.error("Failed to fetch playlist");
          return;
        }
        const data = await resp.json();
        setPlaylist(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPlaylist();
  }, [idOrSlug]);

  if (!playlist) {
    return <div className="container"><p>Loading playlist...</p></div>;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{playlist.playlistName}</h2>
        <p style={{ marginBottom: "1rem" }}>{playlist.description}</p>
        {playlist.tracks.map((track, idx) => (
          <div key={idx} className="track-card">
            <p style={{ fontWeight: "bold" }}>{track.title}</p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{track.channelTitle}</p>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${track.videoId}`}
              title={track.title}
              frameBorder="0"
              allowFullScreen
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPlayer;
