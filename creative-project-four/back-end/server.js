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
        index: true
    },
    url: String,
    timesViewed: Number,
});

memeSchema.virtual('id')
    .get(function () {
        return this._id.toHexString();
    });

memeSchema.set('toJSON', {
    virtuals: true
});

const Meme = mongoose.model('Meme', memeSchema);

const savedMemeSchema = new mongoose.Schema({
    memeID: String,
    savedByUser: {
        type: String,
        required: true,
        index: true
    },
    savedTime: Date,
});

savedMemeSchema.index({ memeID: 1, savedByUser: 1 }, { unique: true });

savedMemeSchema.set('toJSON', {
    virtuals: true
});

const SavedMeme = mongoose.model('SavedMeme', savedMemeSchema);

async function getUser(username) {
    const query = User.where({ name: username });
    let user = await query.findOne();
    return user;
}

async function getMeme(memeID, updateViews) {
    if (updateViews) {
        return new Promise(function (myResolve, myReject) {
            Meme.findById(memeID).exec().then(
                async function (value) {
                    try {
                        let meme = value;
                        newTimesViewed = meme.timesViewed + 1;
                        let updatedMeme = await Meme.findByIdAndUpdate(value.id, { timesViewed: newTimesViewed })
                        myResolve(updatedMeme);
                    }
                    catch (error) {
                        myReject(error)
                    }
                },
                function (error) {
                    myReject(error);
                }
            );
        });
    }
    else {
        return Meme.findById(memeID).exec();
    }
};

function getQueryPromise(query, compareFunc) {
    return new Promise(function (myResolve, myReject) {
        query.then(
            function (value) {
                if (compareFunc(value)) {
                    myReject("No object found");
                }
                else {
                    myResolve(value);
                }
            },
            function (error) {
                myReject(error);
            }
        )
    });
};

function checkIfNull(value) {
    return value === null;
};

app.post('/api/v4/user/:username', async (req, res) => {  // If doing an actual account sort of thing, need to throw an error if a username has been already taken.
    try {
        let alreadyExistingUser = await getUser(req.params.username);
        if (alreadyExistingUser !== null) {
            res.send({ user: alreadyExistingUser });
            return;
        }
        else {
            const user = new User({
                name: req.params.username,
                joinTime: Date.now(),
            });
            await user.save();
            res.send({ user: user });
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/api/v4/user/:username', async (req, res) => {
    try {
        let user = await getUser(req.params.username);
        if (user === null) {
            res.sendStatus(404);
            return;
        }
        res.send({ user: user });
    }
    catch (error) {
        res.sendStatus(500);
    }
});

app.post('/api/v4/meme/saved/:userid/:memeid', async (req, res) => {
    try {
        let userID = req.params.userid;
        let memeID = req.params.memeid;
        let checks = [getQueryPromise(User.findById(userID).exec(), checkIfNull), getQueryPromise(Meme.findById(memeID).exec(), checkIfNull)]
        let passed = await Promise.all(checks).then((values) => {
            return true;
        }).catch((error) => {
            return false;
        });
        if (!passed) {
            res.sendStatus(404);
            return;
        }

        let query = SavedMeme.where({ memeID: memeID, savedByUser: userID });
        let alreadyExistsSavedMeme = await query.findOne();
        if (alreadyExistsSavedMeme !== null) {
            res.sendStatus(204);
            return;
        }
        else {
            const savedMeme = new SavedMeme({
                memeID: memeID,
                savedByUser: userID,
                savedTime: Date.now()
            });
            await savedMeme.save();
            res.send({ savedMeme: savedMeme });
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/v4/meme/saved/:userid', async (req, res) => {
    try {
        const query = SavedMeme.where({ savedByUser: req.params.userid })
            .sort({ savedTime: -1 });
        let savedMemes = await query.find();
        if (savedMemes === null) {
            res.sendStatus(204);
        }
        let memes = await Promise.allSettled(savedMemes.map(async (savedMeme) => {
            return getMeme(savedMeme.memeID);
        }));
        memes = memes.filter((value) => {
            return value.status === 'fulfilled';
        });
        memes = memes.map((value) => {
            let meme = value.value;
            meme.id = meme._id.toHexString();
            return meme;
        });
        res.send(memes);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/v4/meme/saved/:userid/:memeid', async (req, res) => {
    try {
        let userID = req.params.userid;
        let memeID = req.params.memeid;
        const query = SavedMeme.where({ savedByUser: userID, memeID: memeID })
        let savedMeme = await query.findOne();
        if (savedMeme === undefined) {
            res.sendStatus(204);
            return;
        }
        else {
            res.send(savedMeme);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/v4/meme/saved/:userid/:memeid', async (req, res) => {
    try {
        const query = SavedMeme.where({ savedByUser: req.params.userid, memeID: req.params.memeid });
        let savedMeme = await query.findOneAndDelete();
        if (savedMeme === undefined) {
            res.sendStatus(404);
            return;
        }
        else {
            res.send(savedMeme);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/api/v4/meme/random', async (req, res) => {
    try {
        let url = appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
        let response = await axios.get(url);
        if (response.data.code === 402) {
            res.status(402)
                .send('My daily usage of the API is up. Sorry :(');
            return;
        }
        let randomMeme = response.data;
        let query = Meme.where({ providedID: randomMeme.providedID });
        let foundMeme = await query.findOne();
        console.log(foundMeme);
        if (foundMeme !== null) {
            res.send(foundMeme);
            return;
        }
        const meme = new Meme({
            providedID: randomMeme.id,
            url: randomMeme.url,
            timesViewed: 1
        });
        await meme.save();
        res.send(meme);
    }
    catch (error) {
        console.log(error);
        res.status(500)
            .send("Error retrieving a random meme.");
    }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));  // Running this on 3001. 3000, 3001, and 3002 are being used now.