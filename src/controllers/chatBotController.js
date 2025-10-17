const chatBotServices = require("../services/chatBotServices");

class ChatBotController {
   async getBySlug(req,res){
    try{
        const {slug} = req.params;
        const chatbot = await chatBotServices.getBySlug(slug)
        if(!chatbot) throw new Error('Chatbot not found');
        res.status(200).json({status: true, chatbot});
    } catch(error){
        next(error);
    }
   }
   async updateChatbot(req,res){
    try{
        const {id} = req.params
        const allowedFields = ['companyName', 'welcomeMessage', 'description'];
        const update = {};
         allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            update[field] = req.body[field];
        }
        });
            if (req.file) update.logoUrl = `/uploads/${req.file.filename}`;
        const chatbot = await chatBotServices.updateChatBot(id, update);
        res.status(200).json({status: true, message: 'Owner Information updated successfully', chatbot});
    } catch(error){
        next(error);
    }
   }
}

module.exports = new ChatBotController();