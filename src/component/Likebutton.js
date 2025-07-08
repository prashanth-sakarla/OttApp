import React, { useState } from 'react';

const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLikes(prev => liked ? prev - 1 : prev + 1);
        setLiked(!liked);
    };

    return (
        <div>
            <button onClick={toggleLike}>
                {liked ? '💖 Liked' : '🤍 Like'} ({likes})
            </button>
        </div>
    );
};

export default LikeButton;
