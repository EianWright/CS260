class UserServer {
    constructor(userDAO) {
        this.userDAO = userDAO;
    }

    initialize(app) {
        app.post('/api/v4/user/:username', async (req, res) => {  // If doing an actual account sort of thing, need to throw an error if a username has been already taken.
            try {
                let alreadyExistingUser = await this.userDAO.getUser(req.params.username);
                if (alreadyExistingUser !== null) {
                    res.send({ user: alreadyExistingUser });
                    return;
                }
                else {
                    const user = await this.userDAO.saveUser(req.params.username);
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
                let user = await this.userDAO.getUser(req.params.username);
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
    }

}

module.exports = UserServer;