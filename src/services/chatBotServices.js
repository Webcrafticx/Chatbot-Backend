const chatBotRepo = require('../repositories/chatBotRepo');
const slugify = require('../utils/slugify');

class chatBotServices {
    static async createChatBot(data){
        const {ownerId, companyName, logoUrl, welcomeMessage, description} = data;
        const slug = slugify(companyName);
        const existing = await chatBotRepo.findBySlug(slug);
        if(existing) throw new Error('Chatbot already exists with this name');
        return await chatBotRepo.create({owner: ownerId, companyName, logoUrl, slug, welcomeMessage, description});
    }
    static async updateChatBot(id, data){
        return await chatBotRepo.update(id, data);
    }

    static async getBySlug(slug){
        return await chatBotRepo.findBySlug(slug);
    }

    static async listByOwner(ownerId){
        return await chatBotRepo.findByOwner(ownerId);
    }
}

module.exports = chatBotServices