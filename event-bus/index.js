const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json()); 

const events = [];
app.post("/events", (req, res) => {
    events.push(req.body);
    axios.post("http://localhost:4000/events", req.body);
    axios.post("http://localhost:4001/events", req.body);
    axios.post("http://localhost:4002/events", req.body); 
    axios.post("http://localhost:4003/events", req.body); 

    res.send("success");
});

app.get("/events", (req, res) => {
    res.send(events);
});

app.listen(4005, () => console.log("Server started on port 4005"));