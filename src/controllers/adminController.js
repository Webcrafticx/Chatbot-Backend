const userServices = require('../services/userServices');

class admin {
    async listUsers(req,res){
        try{
            const users = await userServices.list({role: 'user'})
            res.status(200).json({status: true, users})
        } catch(error){
            next(error);
        }
    }
    async deleteUser(req,res){
        try{
            const {id} = req.params;
            const user = await userServices.deleteUser(id);
            res.status(200).json({status: true, message: 'User deleted successfully'})
        }
        catch(error){
            next(error);
        }
    }
}

module.exports = new admin();