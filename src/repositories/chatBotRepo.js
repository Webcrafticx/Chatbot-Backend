const Chatbot = require('../models/chatBot');

class chatBotRepo {
    static async create(chatbot){
        return await Chatbot.create(chatbot);
    }
    static async findByOwner(ownerId){
        return await Chatbot.findOne({owner: ownerId});
    }
    static async findBySlug(slug){
        return await Chatbot.findOne({slug});
    }
    static async findById(id){
        return await Chatbot.findById(id);
    }
    static async update(id, update){
        return await Chatbot.findByIdAndUpdate(id, update, {new: true});
    }
    // static async delete(id){
    //     return await Chatbot.findByIdAndDelete(id);
    // }
}

module.exports = chatBotRepo

