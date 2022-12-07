const axios = require('axios');
const { appendAPIKEY } = require('./Authentication');

class MemeDAO {
    constructor(mongoose) {
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

        this.Meme = mongoose.model('Meme', memeSchema);
    };

    async #getMemePromise(memeID) {
        return new Promise(function (myResolve, myReject) {
            this.Meme.findById(memeID).exec().then(
                async function (value) {
                    try {
                        let meme = value;
                        newTimesViewed = meme.timesViewed + 1;
                        let updatedMeme = await this.Meme.findByIdAndUpdate(value.id, { timesViewed: newTimesViewed })
                        myResolve(updatedMeme);
                    }
                    catch (error) {
                        myReject(error);
                    }
                },
                function (error) {
                    myReject(error);
                }
            );
        });
    };

    async #checkMemeForPromise(memeID, updateViews) {
        if (updateViews) {
            return this.#getMemePromise(memeID);
        }
        else {
            return this.Meme.findById(memeID).exec();
        }
    };

    async getMultipleMemes(memes, updateViews) {
        let retrievedMemes = await Promise.allSettled(memes.map(async (meme) => {
            return this.#checkMemeForPromise(meme.memeID, updateViews);
        }));
        retrievedMemes = retrievedMemes.filter((value) => {
            return value.status === 'fulfilled';
        });
        retrievedMemes = retrievedMemes.map((value) => {
            let meme = value.value;
            meme.id = meme._id.toHexString();
            return meme;
        });
        return retrievedMemes;
    };

    getMemeWithPromiseByID(memeID) {
        return this.Meme.findById(memeID).exec();
    }

    async getRandomMeme() {
        try {
            let url = appendAPIKEY("https://api.humorapi.com/memes/random?media-type=image&api-key=");
            let response = await axios.get(url);
            if (response.data.code === 402) {
                console.log("No more memes left.");
                return null;
            }
            let randomMeme = response.data;
            let query = this.Meme.where({ providedID: randomMeme.providedID });
            let foundMeme = await query.findOne();
            if (foundMeme !== null) {
                return foundMeme;
            }
            const meme = new this.Meme({
                providedID: randomMeme.id,
                url: randomMeme.url,
                timesViewed: 1
            });
            await meme.save();
            return meme;
        }
        catch (error) {
            console.log("Error!");
            console.log(error);
            return null;
        }
    }

}

module.exports = MemeDAO;