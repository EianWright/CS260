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

        app.get('/api/v4/meme/saved/:userid/:numbermemes/:sortorder/:lastmemeid', async (req, res) => {
            try {
                let numberOfMemesToRetrieve = parseInt(req.params.numbermemes) + 1;
                let userID = req.params.userid;
                let lastSavedTime = req.params.lastmemeid;
                if (lastSavedTime !== "NONE") {
                    let lastSavedMeme = await this.savedMemeDAO.getSavedMemeByIDs(lastSavedTime, userID);
                    if (lastSavedMeme !== null) {
                        lastSavedTime = lastSavedMeme.savedTime;
                    }
                }
                let sortOrder = req.params.sortorder;
                let savedMemes = await this.savedMemeDAO.getSavedMemesByUserID(userID, sortOrder, numberOfMemesToRetrieve, lastSavedTime);
                if (savedMemes === null) {
                    res.sendStatus(204);
                }
                let hasMore = (savedMemes.length == numberOfMemesToRetrieve);
                if (hasMore) {
                    savedMemes = savedMemes.slice(0, -1);
                }
                let memes = await this.memeDAO.getMultipleMemes(savedMemes);
                res.send({ memes: memes, hasMore: hasMore });
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