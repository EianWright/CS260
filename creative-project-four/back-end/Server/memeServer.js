class MemeServer {
    constructor(memeDAO) {
        this.memeDAO = memeDAO;
    }

    initialize(app) {
        app.get('/api/v4/meme/random', async (req, res) => {
            let randomMeme = await this.memeDAO.getRandomMeme();
            if (randomMeme === null) {
                res.status(500)
                    .send("Error retrieving a random meme.");
            }
            else {
                res.send(randomMeme);
            }
        });
    }
}

module.exports = MemeServer;