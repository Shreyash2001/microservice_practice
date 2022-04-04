import React, { useState } from 'react';
import axios from "axios";

function CommentCreate({comments, postId}) {
    const [content, setContent] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content});
        setContent("");
    };

    const renderComments = comments?.map((comment) => {
     return <li key={comment.id}>{comment.content}</li>
    })

  return (
    <div>
      <div>
        <ul>
          {renderComments}
        </ul>
      </div>
        <form onSubmit={handleSubmit}>
        <input onChange={(e) => setContent(e.target.value)} value={content} placeholder="add comment" />
        <button>Submit</button>
        </form>
    </div>
  )
}

export default CommentCreate