const chatBotServices = require("../services/chatBotServices");
const cloudinary = require("cloudinary").v2;
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
   async updateChatbot(req,res,next){
    try{
        const {id} = req.params
        console.log('File received:', req.file);
        console.log('Body received:', id);
        const allowedFields = ['companyName', 'welcomeMessage', 'description'];
        const update = {};
         allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            update[field] = req.body[field];
        }
        });
 if (req.file) {
      update.logoUrl = req.file.path;        // secure URL from Cloudinary
      update.logoPublicId = req.file.filename; // public_id from Cloudinary
    }
        const chatbot = await chatBotServices.updateChatBot(id, update);
        res.status(200).json({status: true, message: 'Owner Information updated successfully', chatbot});
    } catch(error){
        console.error(error);
        next(error);
    }
   }
}

module.exports = new ChatBotController();