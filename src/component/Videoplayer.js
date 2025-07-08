import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videos, onLike, onComment }) => {
    const { id } = useParams();
    const video = videos.find(v => v.id === parseInt(id));

    const [commentInput, setCommentInput] = React.useState("");

    const handleAddComment = () => {
        if (!commentInput.trim()) return;
        onComment(video.id, commentInput);
        setCommentInput('');
    };

    if (!video) return <div>Video not found</div>;

    return (
        <div className="player-container">
            <h2>{video.title}</h2>
            <ReactPlayer url={video.videoUrl} controls width="100%" height="500px" />

            <div>
                <button onClick={() => onLike(video.id)}>👍 Like ({video?.likes})</button>
            </div>

            <div className="comment-section">
                <h4>Comments ({video?.comments?.length})</h4>
                <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Post</button>
                <ul>
                    {video?.comments.map((c) => (
                        <li key={c.id}>{c.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VideoPlayer;
