const userRepo = require('../repositories/userRepo');

class userServices{
    static async getById(id){
        return await userRepo.findById(id);
    }
    static async list(opts = {}){
        return await userRepo.list(opts);
    }
}

module.exports = userServices