const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserDAO = require('./DAO/userDAO');
const MemeDAO = require('./DAO/memeDAO');
const SavedMemeDAO = require('./DAO/SavedMemeDAO');

const UserServer = require('./Server/userServer');
const MemeServer = require('./Server/memeServer');
const SavedMemeServer = require('./Server/savedMemeServer');

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const userDAO = new UserDAO(mongoose);
const memeDAO = new MemeDAO(mongoose);
const savedMemeDAO = new SavedMemeDAO(mongoose);

const userServer = new UserServer(userDAO);
const memeServer = new MemeServer(memeDAO);
const savedMemeServer = new SavedMemeServer(memeDAO, userDAO, savedMemeDAO);

userServer.initialize(app);
memeServer.initialize(app);
savedMemeServer.initialize(app);

app.listen(3001, () => console.log('Server listening on port 3001!'));  // Running this on 3001. 3000, 3001, and 3002 are being used now.