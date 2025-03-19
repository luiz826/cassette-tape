import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from db import init_db
from routers.playlist_router import router as playlist_router

load_dotenv()  # load .env variables

app = FastAPI()

# CORS config
origins = ["http://localhost:3000", ""]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB
init_db()

# Register routers
app.include_router(playlist_router, prefix="/api/playlists", tags=["Playlists"])
