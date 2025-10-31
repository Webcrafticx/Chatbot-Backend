const authServices = require('../services/authServices');
class authController{
    async register(req,res,next) {
        try{
            const {name,email,password,role = 'user', durationInMonths, amount} = req.body;
            if(!name || !email || !password || !role || !durationInMonths || !amount) throw new Error('All fields are required');
            const user = await authServices.register({name,email,password,role, durationInMonths, amount});
            res.status(201).json({status: true,
                message: 'User registered successfully',
                // user:{
                //     id: user._id,
                //     name: user.name,
                //     email: user.email,
                //     role: user.role
                // }
                })
        } catch(error){
            next(error);
        }
    }
    async login(req,res,next){
        try{
            const {email,password} = req.body;
            const {user,token} = await authServices.login({email,password})
            res.status(200).json({status: true,
                message: 'User logged in successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    subscriptionStatus: user.subscription?.status ,
                    subscriptionEndDate: user.subscription?.endDate,
                },
                token
            })
        } catch(error){
            next(error);
        }
    }

    async adminRegister(req,res,next) {
        try{
            const {name,email,password,role = 'admin'} = req.body;
            if(!name || !email || !password || !role) throw new Error('All fields are required');
            const user = await authServices.register({name,email,password,role});
            res.status(201).json({status: true,
                message: 'Admin registered successfully',
                // user:{
                //     id: user._id,
                //     name: user.name,
                //     email: user.email,
                //     role: user.role
                // }
                })
        } catch(error){
            next(error);
        }
    }

    async renewSubscription(req,res,next){
        try{
            const {durationInMonths, amount, paymentMode, userId} = req.body;
            if(!durationInMonths || !amount || !userId) throw new Error('All fields are required');
            const renewedUser = await authServices.renewSubscription({userId, durationInMonths, amount, paymentMode});
            res.status(200).json({status: true,
                message: 'Subscription renewed successfully',
                subscription: renewedUser.subscription
            })
        } catch(error){
            next(error);
        }
    }
}

module.exports = new authController();