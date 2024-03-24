// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./database/database.js');
const FSUtils = require('../shared/FSUtils')
const {calculateUserRevenue} = require("./data_processor");
const eventsPath = './server/events/serverEvents.jsonl';

const app = express();
const PORT = 8000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/liveEvent', (req, res) => {
    const event = req.body;
    if (!event.userId) {
        res.status(400).json("invalid event");
    }
    FSUtils.appendFile(eventsPath, JSON.stringify(event));
    calculateUserRevenue()
        .catch((err) => {
            console.log("error updating user", err);
            res.status(400).json();
        })
    res.status(200).json();
})

app.get('/userEvents/:userId', async (req, res) => {
    const userId = req.params.userId;
    if (!userId) res.status(500).json("Missing user_id: required in path parameter");
    const user = await db.queryByUserId(userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json("Invalid user_id: user with id " + userId + " not found");
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
