class UserDAO {
    constructor(mongoose) {

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

        this.User = mongoose.model('User', userSchema);
    }

    async getUser(username) {
        const query = this.User.where({ name: username });
        let user = await query.findOne();
        return user;
    }

    getUserWithPromiseByID(userID) {
        return this.User.findById(userID).exec();
    }

    async saveUser(username) {
        const user = new this.User({
            name: username,
            joinTime: Date.now(),
        });
        await user.save();
        return user;
    }
}

module.exports = UserDAO;