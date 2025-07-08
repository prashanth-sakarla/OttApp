import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/component/Home';
import Login from './component/Loginpage';
import VideoPlayer from '../src/component/Videoplayer';
import rawVideos from './assets/VideosData';
import WatchlistVideos from './pages/Users/UserWatchList';
import LikedVideos from './pages/Users/LikedVideos';

const App = () => {
  const [videos, setVideos] = useState(rawVideos);

  const updateLikes = (id) => {
    setVideos(prev =>
      prev.map(video =>
        video.id === id ? { ...video, likes: video.likes + 1 } : video
      )
    );
  };

  const addComment = (id, text) => {
    setVideos(prev =>
      prev.map(video =>
        video.id === id
          ? { ...video, comments: [...video.comments, { id: Date.now(), text }] }
          : video
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<Home videos={videos} />} />
        <Route
          path="/video/:id"
          element={<VideoPlayer videos={videos} onLike={updateLikes} onComment={addComment} />}
        />
        <Route path='/watchlist' element={<WatchlistVideos />} />
        <Route path='/likedlist' element={<LikedVideos />} />
      </Routes>
    </Router>
  );
};

export default App;
