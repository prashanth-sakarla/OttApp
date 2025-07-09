import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Loginpage';
import VideoPlayer from './component/Videoplayer';
import rawVideos from './assets/VideosData';
import WatchlistVideos from './pages/Users/UserWatchList';
import LikedVideos from './pages/Users/LikedVideos';
import ProtectedRoute from './component/ProtectedRoute.js'; // Add this file

const App = () => {
  const [videos, setVideos] = useState(rawVideos);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home videos={videos} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/video/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <VideoPlayer videos={videos} onLike={updateLikes} onComment={addComment} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <WatchlistVideos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/likedlist"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <LikedVideos />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
