import React, { useState } from 'react';
import axios from "axios";

function Posts() {
    const [title, setTitle] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:4000/posts", {title});
        console.log(data);
        setTitle("");
    }
  return (
    <div>
        <form onSubmit={onSubmit}>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Posts