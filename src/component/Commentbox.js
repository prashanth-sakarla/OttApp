import React, { useState } from 'react';

const CommentBox = ({ videoId }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleAddComment = () => {
        if (!comment.trim()) return;
        setComments(prev => [...prev, { id: Date.now(), text: comment }]);
        setComment('');
    };

    return (
        <div className="comment-section">
            <h4>Comments</h4>
            <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Post</button>
            <ul>
                {comments.map(c => (
                    <li key={c.id}>{c.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentBox;
