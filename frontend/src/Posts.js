import React, { useEffect, useState } from 'react';
import axios from "axios";
import CommentCreate from './CommentCreate';

function Posts() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState({});

    const fetchPost = async() => {
      const {data} = await axios.get("http://posts.com/posts");
      setPosts(data);
    }

    useEffect(() => {
      fetchPost();
    }, []);

    const renderPost = Object.values(posts)?.map((post) => {
      return (
        <div>
        <div key={post?.id}>
          <h3>{post?.title}</h3>
        </div>
        <CommentCreate comments={post.comments} postId={post.id} />
        </div>
      )
    })

    const onSubmit = async(e) => {
        e.preventDefault();
        const {data} = await axios.post("http://posts.com/posts/create", {title});
        console.log(data);
        setTitle("");
    }
  return (
    <div style={{padding: "10px"}}>
        <form onSubmit={onSubmit}>
            <div>
            <label>Title</label>
            <input style={{width:"300px", height:"30px", padding:"5px", marginLeft:"10px", marginBottom:"10px", fontSize:"16px"}} value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button style={{marginLeft:"100px"}}>Submit</button>
        </form>
        <div>
          {renderPost}
        </div>
    </div>
  )
}

export default Posts