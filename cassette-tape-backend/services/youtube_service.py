import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("YOUTUBE_API_KEY")
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"


def search_youtube_videos(query, limit=5):
    params = {"part": "snippet", "maxResults": limit, "q": query, "key": API_KEY}
    resp = requests.get(YOUTUBE_SEARCH_URL, params=params)
    if resp.status_code == 200:
        data = resp.json()
        items = data.get("items", [])
        results = []
        for item in items:
            if item["id"]["kind"] == "youtube#video":
                results.append(
                    {
                        "videoId": item["id"]["videoId"],
                        "title": item["snippet"]["title"],
                        "channelTitle": item["snippet"]["channelTitle"],
                        "thumbnail": item["snippet"]["thumbnails"]["default"]["url"],
                    }
                )
        return results
    return []
