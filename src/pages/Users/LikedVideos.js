import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../../App.css';
import LikedVideosList from '../../assets/LikedVideos';

const LikedVideos = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');


    // Filter videos based on search
    const filteredVideos = LikedVideosList.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            {/* Header with hamburger and search */}
            <div className="header">
                <button className="hamburger" onClick={() => navigate(-1)}>
                    back
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
            <p>Liked Videos </p>
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

export default LikedVideos;
