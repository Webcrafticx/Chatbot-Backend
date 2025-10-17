const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepo');

const authMiddleware = async (req,res,next) => {
    const header = req.headers.authorization
    if(!header || !header.startsWith('Bearer')){
        return res.status(401).json({error: 'No token provided'});
    }
    const token = header.split(' ')[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userRepo.findById(decoded.id)
        if(!user){
            return res.status(401).json({error: 'User not found'});
        }
        req.user = user
        next();
    } catch(error){
        return res.status(401).json({error: 'Invalid token'});
    }
}

const adminOnly = (req,res,next) => {
    if(!req.user || req.user.role!== 'admin'){
        return res.status(403).json({error: 'You are not authorized to perform this action'});
    }
    next();

}

module.exports = {authMiddleware, adminOnly};