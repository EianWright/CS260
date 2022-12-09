class SavedMemeDAO {
    constructor(mongoose) {

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

        this.SavedMeme = mongoose.model('SavedMeme', savedMemeSchema);
    }

    async getSavedMemeByIDs(memeID, userID) {
        let query = this.SavedMeme.where({ memeID: memeID, savedByUser: userID });
        return await query.findOne();
    }

    async deleteSavedMemeByIDs(memeID, userID) {
        const query = this.SavedMeme.where({ memeID: memeID, savedByUser: userID });
        return await query.findOneAndDelete();
    }

    async saveSavedMeme(memeID, userID) {
        const savedMeme = new this.SavedMeme({
            memeID: memeID,
            savedByUser: userID,
            savedTime: Date.now()
        });
        await savedMeme.save();
        return savedMeme;
    }

    async getSavedMemesByUserID(userID, sortOrder, numberOfMemesToRetrieve, lastMemeSavedTime) {
        if (lastMemeSavedTime === "NONE") {
            if (sortOrder === "NEWEST") {
                sortOrder = -1;
            }
            else if (sortOrder === "OLDEST") {
                sortOrder = 1;
            }
            else {
                return null;
            }
            const query = this.SavedMeme.where({ savedByUser: userID })
            .sort({ savedTime: sortOrder })
            .limit(numberOfMemesToRetrieve);
            return await query.find();
        }
        else if (sortOrder === "NEWEST") {
            const query = this.SavedMeme.where({ savedByUser: userID, savedTime: {$lt : lastMemeSavedTime} })
            .sort({ savedTime: -1 })
            .limit(numberOfMemesToRetrieve);
            return await query.find();
        }
        else if (sortOrder === "OLDEST") {
            const query = this.SavedMeme.where({ savedByUser: userID, savedTime: {$gt : lastMemeSavedTime} })
            .sort({ savedTime: 1 })
            .limit(numberOfMemesToRetrieve);
            return await query.find();
        }
        else {
            return null;
        }
    }

}

module.exports = SavedMemeDAO;