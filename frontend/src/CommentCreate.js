import React, { useEffect, useState } from 'react';
import axios from "axios";

function CommentCreate({postId}) {
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {content});
        fetchComment()
        setContent("");
    };

    const fetchComment = async() => {
      const {data} = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
      console.log(data)
      setComments(data);
    }
    const renderComments = comments?.map((comment) => {
     return <li key={comment.id}>{comment.content}</li>
    })

    useEffect(() => {
      fetchComment();
    }, [])
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