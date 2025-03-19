import uuid
import json
from sqlalchemy import Column, Integer, String, Text
from db import Base


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(Integer, primary_key=True, index=True)
    playlist_name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    shareable_link_id = Column(String(50), unique=True, nullable=False)
    tracks_json = Column(Text, nullable=True)

    def __init__(self, playlist_name, description, tracks_json):
        self.playlist_name = playlist_name
        self.description = description
        # Generate a short random slug, e.g., first 8 of a UUID
        self.shareable_link_id = str(uuid.uuid4())[:8]
        self.tracks_json = tracks_json

    def to_dict(self):
        return {
            "id": self.id,
            "playlistName": self.playlist_name,
            "description": self.description,
            "shareableLinkId": self.shareable_link_id,
            "tracks": json.loads(self.tracks_json) if self.tracks_json else [],
        }
