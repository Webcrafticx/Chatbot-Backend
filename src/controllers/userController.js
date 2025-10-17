const chatBotServices = require("../services/chatBotServices");
const QAServices = require("../services/qaServices");

class UserController{
    async createChatbot(req,res,next){
        try{
            const ownerId = req.user._id;
            const {companyName, welcomeMessage} = req.body;
            const logoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
            const cb = await chatBotServices.createChatBot({ownerId, companyName, logoUrl, welcomeMessage});
            res.status(201).json({status: true, message: 'Chatbot created successfully', chatbot: cb});
        } catch(error){
            next(error);
        }
    }

    async listChatbots(req,res,next){
        try{
            const list = await chatBotServices.listByOwner(req.user._id);
            res.status(200).json({status: true, chatbots: list});
        } catch(error){
            next(error);
        }
    }
    async addQA(req,res,next){
        try{
            const { chatbotId, question, answer, isDisplay, keywords } = req.body;
            const cb = await chatBotServices.getBySlug ? null : null;
            const qa = await QAServices.createQA({chatbot:chatbotId, question, answer, isDisplay, keywords: (keywords || []).map(k => k.toLowerCase())});
            res.status(201).json({status: true, message: 'QA created successfully', qa});
        } catch(error){
            next(error);
        }
    }
    async updateQA(req,res,next){
        try{
            const {id} = req.params
            const update = req.body;
            const qa = await QAServices.update(id, update);
            res.status(200).json({status: true, message: 'QA updated successfully', qa});
        } catch(error){
            next(error);
        }
    }
    async deleteQA(req,res,next){
        try{
            const {id} = req.params
            const qa = await QAServices.delete(id);
            res.status(200).json({status: true, message: 'QA deleted successfully'});
        } catch(error){
            next(error);
        }
    }
}

module.exports = new UserController();