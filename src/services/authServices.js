const userRepo = require('../repositories/userRepo');
// const User = require('../models/user');
const jwt = require('jsonwebtoken');
class authServices{
    static async register(data){
        const {name,email,password,role} = data;
        const existing = await userRepo.findByEmail(email)
        if(existing) throw new Error('User already exists with this email');
        return await userRepo.create({name,email,password,role});
    }

    static async login(data){
        const {email,password} = data;
        const user = await userRepo.findByEmail(email,true);
        if(!user) throw new Error('User not found');
        const isMatch = await user.matchPassword(password);
        if(!isMatch) throw new Error('Invalid credentials');
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        return {user,token};
    }
}

module.exports = authServices