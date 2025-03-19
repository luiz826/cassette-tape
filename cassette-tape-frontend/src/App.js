import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlaylistCreator from './components/PlaylistCreator';
import PlaylistPlayer from './components/PlaylistPlayer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaylistCreator />} />
        <Route path="/play/:idOrSlug" element={<PlaylistPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
