const userRepo = require('../repositories/userRepo');
// const User = require('../models/user');
const jwt = require('jsonwebtoken');
class authServices{
    static async register(data){
        const {name,email,password,role, durationInMonths, amount} = data;
        const existing = await userRepo.findByEmail(email)
        if(existing) throw new Error('User already exists with this email');
        const startDate = new Date();
          const months = Number(durationInMonths) || 1;
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + months);
        return await userRepo.create({name,email,password,role, subscription: {
            plan: 'monthly',
            durationInMotnhs: durationInMonths,
            startDate,
            endDate,
            amount,
            status: 'active',
            paymentMode: 'online',
        }});
    }

    static async login(data){
        const {email,password} = data;
        const user = await userRepo.findByEmail(email,true);
        if(!user) throw new Error('User not found');
        const isMatch = await user.matchPassword(password);
        if(!isMatch) throw new Error('Invalid credentials');

    if (user.role !== 'admin' && user.subscription) {
    const currentDate = new Date();
    
    if (user.subscription.endDate && currentDate > user.subscription.endDate && user.subscription.status !== 'expired') {
      await userRepo.updateById(
        user._id,
        { 'subscription.status': 'expired' }
      );
      user.subscription.status = 'expired';
    }
  }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        return {user,token};
    }

    static async renewSubscription({userId, durationInMonths, amount, paymentMode = 'online'}){ 
        const user = await userRepo.findById(userId);
        if(!user) throw new Error('User not found');
        const paymentId = paymentMode === "online" 
        ? `rzp_test_${Math.random().toString(36).substring(2, 10)}`
        : `cash_${Math.random().toString(36).substring(2, 10)}`;
        const newStartDate = new Date();
          const months = Number(durationInMonths) || 1;
        const newEndDate = new Date();
        newEndDate.setMonth(newEndDate.getMonth() + months);
        return await userRepo.updateById(userId,{
            subscription: {
                plan: 'monthly',
                durationInMotnhs: durationInMonths,
                startDate: newStartDate,    
                endDate: newEndDate,
                amount,
                status: 'active',
                paymentMode,
                paymentId
            }
        })

    }
}

module.exports = authServices