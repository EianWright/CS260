class SavedMemeServer {
    constructor(memeDAO, userDAO, savedMemeDAO) {
        this.memeDAO = memeDAO;
        this.userDAO = userDAO;
        this.savedMemeDAO = savedMemeDAO;
    }

    initialize(app) {
        app.post('/api/v4/meme/saved/:userid/:memeid', async (req, res) => {
            try {
                let userID = req.params.userid;
                let memeID = req.params.memeid;

                if (!(await this.#doChecks(userID, memeID))) {
                    res.sendStatus(404);
                    return;
                }

                let alreadyExistsSavedMeme = await this.savedMemeDAO.getSavedMemeByIDs(memeID, userID);
                if (alreadyExistsSavedMeme !== null) {
                    res.sendStatus(204);
                    return;
                }
                else {
                    let savedMeme = await this.savedMemeDAO.saveSavedMeme(memeID, userID);
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
                let savedMemes = await this.savedMemeDAO.getSavedMemesByUserID(req.params.userid, -1);
                if (savedMemes === null) {
                    res.sendStatus(204);
                }
                let memes = await this.memeDAO.getMultipleMemes(savedMemes);
                res.send(memes);
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });

        app.get('/api/v4/meme/saved/:userid/:memeid', async (req, res) => {
            try {
                let savedMeme = await this.savedMemeDAO.getSavedMemeByIDs(req.params.memeid, req.params.userid);
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
                let deletedSavedMeme = await this.savedMemeDAO.deleteSavedMemeByIDs(req.params.memeid, req.params.userid);
                if (deletedSavedMeme === undefined) {
                    res.sendStatus(404);
                    return;
                }
                else {
                    res.send(deletedSavedMeme);
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        });
    }

    #checkIfNull(value) {
        return value === null;
    };

    #getChecks(userID, memeID) {
        return [
            this.#getQueryPromise(this.userDAO.getUserWithPromiseByID(userID), this.#checkIfNull), 
            this.#getQueryPromise(this.memeDAO.getMemeWithPromiseByID(memeID), this.#checkIfNull)];
    }

    async #doChecks(userID, memeID) {
        let passed = await Promise.all(this.#getChecks(userID, memeID)).then((values) => {
            return true;
        }).catch((error) => {
            return false;
        });
        return passed;
    }

    
    #getQueryPromise(query, compareFunc) {
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

}

module.exports = SavedMemeServer;