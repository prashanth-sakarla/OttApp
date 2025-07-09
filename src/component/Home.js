import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { FiLogOut } from 'react-icons/fi';
import '../App.css';

const Home = ({ videos }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleMenu = () => setMenuOpen(prev => !prev);

    // Filter videos based on search
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const hanldeLogOut = () => {
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div className="container">
            {/* Header with hamburger and search */}
            <div className="header">
                <button className="hamburger" onClick={toggleMenu}>
                    ☰
                </button>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>

            {/* Sidebar menu */}
            {menuOpen && (
                <div className="sidebar">
                    <ul>
                        <li onClick={() => navigate('/watchlist')}>📺 Watchlist</li>
                        <li onClick={() => navigate('/likedlist')}>❤️ Liked Videos</li>
                        <li onClick={hanldeLogOut}>
                            <FiLogOut style={{ marginRight: '8px' }} />
                            Log Out
                        </li>
                    </ul>
                </div>
            )}
            <p>OTT Plaform Clone </p>
            <div className="videos">
                {filteredVideos.map(video => (
                    <div key={video.id} className="video-card">
                        <ReactPlayer
                            url={video.videoUrl}
                            width="100%"
                            height="180px"
                            controls={false}
                            muted
                            playing={false}
                            light={video.thumbnail}
                            onClickPreview={() => navigate(`/video/${video.id}`)}
                        />
                        <h3 onClick={() => navigate(`/video/${video.id}`)} style={{ cursor: 'pointer' }}>
                            {video?.title}
                        </h3>
                        <p>👍 {video?.likes} | 💬 {video?.comments?.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
