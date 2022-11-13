const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const { appendAPIKEY } = require('./Authentication');

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    joinTime: Date,
});

userSchema.virtual('id')
    .get(function () {
        return this._id.toHexString();
    });

userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', userSchema);

const memeSchema = new mongoose.Schema({
    providedID: { 
        type: Number, 
        unique: true,
        required: true,
        index: true },
    url: String,
    timesViewed: Number,
});

memeSchema.set('toJSON', {
    virtuals: true
});

const Meme = mongoose.model('Meme', memeSchema);

const savedMemeSchema = new mongoose.Schema({
    memeID: Number,
    savedByUser: { 
        type: String, 
        unique: true,
        required: true,
        index: true },
    savedTime: Date,
});

savedMemeSchema.set('toJSON', {
    virtuals: true
});

const SavedMeme = mongoose.model('SavedMeme', savedMemeSchema);

let savedMemes = [];

app.post('/api/v4/user/:username', async (req, res) => {
    const user = new User({
        name: req.params.username,
        joinTime: Date().now,
    });
    try {
        await user.save();
        res.send({ user: user });
    }
    catch (err) {  // TODO: Replace with more specific catch for when a name has already been registered.
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/api/v4/user/:username', async (req, res) => {
    const query = User.where({ name: req.params.username });
    try {
        let user = await query.findOne();
        console.log(user);
        if (user === null) {
            res.sendStatus(404);  // TODO: Replace with specific message/code for when user isn't found.
            return;
        }
        res.send({ user: user });
    }
    catch (error) {
        res.sendStatus(500);
    }
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

app.get('/api/memes/meme/random', async (req, res) => {
    try {
        let url = appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
        let response = await axios.get(url);
        if (response.data.code === 402) {
            res.status(402)
                .send('My daily usage of the API is up. Sorry :(');
            return;
        }
        let meme = response.data;
        res.send(meme);
    }
    catch (error) {
        console.log(error);
        res.status(404)
            .send("Error retrieving a random meme.");
    }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));  // Running this on 3001. 3000, 3001, and 3002 are being used now.