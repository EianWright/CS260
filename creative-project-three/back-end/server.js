const express = require('express');
const bodyParser = require('body-parser');

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
    console.log(username);
    let requestedUserMemes = savedMemes.find(memes => memes.username == username);
    if (requestedUserMemes === undefined) {
        requestedUserMemes = {
            username: username,
            savedMemes: []
        };
        savedMemes.push(requestedUserMemes);
    }
    console.log(requestedUserMemes);
    res.send(requestedUserMemes);
});

app.post('/api/memes/meme/add/:username', (req, res) => {
    let username = req.params.username;
    let requestedUserMemes = savedMemes.find(memes => memes.username == username);
    if (requestedUserMemes === undefined) {
        res.status(404)
            .send("That user does not exist.");
        return;
    }
    else {
        requestedUserMemes.savedMemes.push(req.body);
        res.send(req.body);
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

app.listen(3000, () => console.log('Server listening on port 3000!'));