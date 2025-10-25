const chatBotServices = require("../services/chatBotServices");
const QAServices = require("../services/qaServices");
const chatServices = require("../services/chatServices");
const VisitorService = require("../services/visitorService");

class ChatController {
    async getDisplay(req,res){
        try{
            const {slug} = req.params
            const chatbot = await chatBotServices.getBySlug(slug)
            if(!chatbot) throw new Error('Chatbot not found');
            const list = await QAServices.displayForChatbot(chatbot._id)
            res.status(200).json({status: true, list, chatbot});
        } catch(error){
            next(error);
        }
    }

    async createMessage(req,res,next){
        try{
            const { slug } = req.params;
            const { message } = req.body;
            const chatbot = await chatBotServices.getBySlug(slug);
            if(!chatbot) throw new Error('Chatbot not found');
            const chat = await chatServices.handleVisitorMessage({chatbot: chatbot._id, message});
            res.status(200).json({status: true, message: 'Answer retrieved successfully', chat, chatbot});
        } catch(error){
            next(error);
        }
    }
    async visitorQuery(req,res,next){
        try{
            const {slug} = req.params
            const {email,name,phone,message} = req.body
            if(!email || !name || !phone || !message) throw new error('All fields are required');
            const chatbot = await chatBotServices.getBySlug(slug)
            if(!chatbot) throw new Error('Chatbot not found');
            const query = await VisitorService.create({chatbot: chatbot._id, email, name, phone, message})
            res.status(201).json({status: true, message: 'Query created successfully'});
        } catch(error){
            next(error);
        }
    }
    async visitorList(req,res,next){
        try{
            const {slug} = req.params
            const { page = 1, limit = 20, search, fromDate, toDate } = req.query;

            const chatbot = await chatBotServices.getBySlug(slug)
            if(!chatbot) throw new Error('Chatbot not found');
            const opts = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            search,
            fromDate,
            toDate,
            };
            const List = await VisitorService.visitorList(chatbot._id, opts);
            res.status(200).json({status: true, List});
        } catch(error){
            next(error);
        }
    }
    async updateVistor(req,res,next){
        try{
            const {id} = req.params
            const {status} = req.body;
            console.log(status);
            if (!["solved", "unsolved"].includes(status)) {
            throw new Error("Invalid status value");
            }
            // const chatbot = await chatBotServices.getBySlug(slug)
            // if(!chatbot) throw new Error('Chatbot not found');
            const query = await VisitorService.update(id, status)
            res.status(200).json({status: true, message: 'user updated successfully', query});
        } catch(error){
            next(error);
        }
    }
    async deleteVisitor(req,res,next){
        try{
            const{slug,id} = req.params;
            const chatbot = await chatBotServices.getBySlug(slug)
            if(!chatbot) throw new Error('Chatbot not found');
            const query = await VisitorService.delete(id)
            res.status(200).json({status: true, message: 'user deleted successfully'});
        } catch(error){
            next(error);
        }
    }
}

module.exports = new ChatController();