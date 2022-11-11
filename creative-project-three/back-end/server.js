const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { appendAPIKEY } = require('./Authentication');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

let savedMemes = [];

app.post('/api/memes/user/add/:username', (req, res) => {
    let username = req.params.username;
    let requestedUserMemes = savedMemes.find(memes => memes.username == username);
    if (requestedUserMemes === undefined) {
        requestedUserMemes = {
            username: username,
            savedMemes: []
        };
        savedMemes.push(requestedUserMemes);
    }
    res.send(requestedUserMemes);
});

app.put('/api/memes/meme/add/:username', (req, res) => {
    let username = req.params.username;
    let requestedUserMemes = savedMemes.find(memes => memes.username == username);
    if (requestedUserMemes === undefined) {
        res.status(404)
            .send("That user does not exist.");
        return;
    }
    else {
        requestedUserMemes.savedMemes.push(req.body);
        res.send("Success");
        return;
    }
});

app.get('/api/memes/meme/getall/:username', (req, res) => {
    let username = req.params.username;
    let requestedUserMemes = savedMemes.find(memes => memes.username == username);
    if (requestedUserMemes === undefined) {
        res.status(404)
            .send("That user does not exist.");
        return;
    }
    else {
        res.send(requestedUserMemes.savedMemes);
        return;
    }
});

app.delete('/api/memes/meme/:username/:memeid', (req, res) => {
    let username = req.params.username;
    let toDeleteID = req.params.memeid;
    let requestedUserMemes = savedMemes.find(memes => memes.username == username);
    if (requestedUserMemes === undefined) {
        res.status(404)
            .send("That user does not exist.");
        return;
    }
    else {
        let beforeDeleteSize = requestedUserMemes.savedMemes.length;
        requestedUserMemes.savedMemes = requestedUserMemes.savedMemes.filter(meme => meme.id != toDeleteID);
        if (requestedUserMemes.savedMemes.length != beforeDeleteSize) {
            res.send(toDeleteID);
        }
        else {
            res.status(404)
                .send("No meme found with provided id or name to delete.");
        }
    }
})

app.get('/api/memes/meme/random', (req, res) => {
    try {
        let url = appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
        //let response = await axios.get(url);
        //let meme = response.data;
        let meme = { id: 97784, url: "https://preview.redd.it/69m9ev1bpb051.jpg?auto=webp&s=567dca2c8a02d7f6bf351ef47598a16eb7de1214" }
        res.send(meme);
    }
    catch (error) {
        res.status(404)
            .send("Error retrieving a random meme.");
    }
});

app.listen(3002, () => console.log('Server listening on port 3002!'));