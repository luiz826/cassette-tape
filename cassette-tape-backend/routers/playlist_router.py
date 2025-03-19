from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any

from db import SessionLocal
from models.playlist_model import Playlist
from services.youtube_service import search_youtube_videos
import json

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/search_youtube")
def search_youtube(query: str):
    results = search_youtube_videos(query)
    return results


@router.post("/")
def create_playlist(payload: Dict[str, Any], db: Session = Depends(get_db)):
    playlist_name = payload.get("playlistName")
    description = payload.get("description", "")
    tracks = payload.get("tracks", [])

    if not playlist_name:
        raise HTTPException(status_code=400, detail="playlistName is required")

    tracks_json = json.dumps(tracks)
    new_playlist = Playlist(playlist_name, description, tracks_json)
    db.add(new_playlist)
    db.commit()
    db.refresh(new_playlist)

    return {
        "id": new_playlist.id,
        "playlistName": new_playlist.playlist_name,
        "shareableLinkId": new_playlist.shareable_link_id,
    }


@router.get("/{id_or_slug}")
def get_playlist(id_or_slug: str, db: Session = Depends(get_db)):
    # Attempt to find by shareable_link_id
    playlist = db.query(Playlist).filter_by(shareable_link_id=id_or_slug).first()
    if not playlist:
        # fallback: try integer ID
        if id_or_slug.isdigit():
            playlist = db.query(Playlist).get(int(id_or_slug))
            if not playlist:
                raise HTTPException(status_code=404, detail="Playlist not found")
        else:
            raise HTTPException(status_code=404, detail="Playlist not found")

    return playlist.to_dict()
