const express = require("express");
const {randomBytes} = require("crypto");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(express.json());
app.use(cors());
const posts = {};
app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post("/posts", async(req, res) => {
    const {title} = req.body;
    const id = randomBytes(4).toString("hex");
    posts[id] = {
        id, title
    }
    console.log(posts)
    await axios.post("http://event-bus-srv:4005/events", {
        type : "PostCreated",
        data : {
            id, title
        }
    });
    res.send(posts);
});
 
app.post("/events", (req, res) => {
    console.log("Event Received:", req.body.type);
    res.send({});
})

app.listen(4000, () => console.log("Server started on port 4000"))