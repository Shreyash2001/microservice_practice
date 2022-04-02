import React, { useState } from 'react';
import axios from "axios";

function CommentCreate({postId}) {
    const [content, setContent] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content});
        setContent("");
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input onChange={(e) => setContent(e.target.value)} value={content} placeholder="add comment" />
        <button>Submit</button>
        </form>
    </div>
  )
}

export default CommentCreate