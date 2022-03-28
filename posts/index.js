const express = require("express");
const {randomBytes} = require("crypto");
const app = express();
app.use(express.json());

const posts = {};
app.get("/posts", (req, res) => {
    res.send(posts)
});

app.post("/posts", (req, res) => {
    const {title} = req.body;
    const id = randomBytes(4).toString("hex");
    posts[id] = {
        id, title
    }
    
    res.send(posts);
})

app.listen(4000, () => console.log("Server started on port 4000"))