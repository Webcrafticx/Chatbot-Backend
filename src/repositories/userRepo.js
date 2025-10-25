const User = require('../models/user');
class userRepo{
    static async create(user){
        return await User.create(user);
    }
    static async findById(id){
        return await User.findById(id);
    }
    static async findByEmail(email, includePassword = false) {
        if (includePassword) {
            return await User.findOne({ email }).select("+password");
        }
        return await User.findOne({ email });;
    }

    static async list(filter = {}, opts = {})
    {
        return await User.find(filter).limit(opts.limit || 20).skip(opts.skip || 0).sort(opts.sort || {createdAt: -1});
    }
    static async deleteById(id){
        return await User.findByIdAndDelete(id);
    }
}

module.exports = userRepo