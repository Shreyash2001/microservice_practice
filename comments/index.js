const express = require("express");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());


const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async(req, res) => {
    const id = randomBytes(4).toString("hex");
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id : id, content});
    commentsByPostId[req.params.id] = comments;

    await axios.post("http://event-bus-srv:4005/events", { 
        type: "CommentCreated",
        data : {
            id : id,
            content,
            postId : req.params.id,
            status : "Pending"
        }
    });

    res.send(comments);
});

app.post("/events", async(req, res) => {
    console.log("Event Received", req.body.type);
    const {type, data} = req.body;
    if(type === "CommentModerated") {
        const {id, content, status, postId} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;
        await axios.post("http://localhost:4005/events", {
            type : "CommentUpdated",
            data : {
                id,
                status,
                content,
                postId
            }
        })
    }

    res.send({});
}); 

app.listen(4001, () => console.log("Listening on port 4001"));