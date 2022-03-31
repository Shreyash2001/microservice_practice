import React, { useState } from 'react';
import axios from "axios";

function Posts() {
    const [title, setTitle] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        const {data} = await axios.post("http://localhost:4000/posts", {title});
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
    </div>
  )
}

export default Posts