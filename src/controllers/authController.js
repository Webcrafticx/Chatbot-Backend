const authServices = require('../services/authServices');
class authController{
    async register(req,res,next) {
        try{
            const {name,email,password,role = 'user'} = req.body;
            if(!name || !email || !password || !role) throw new Error('All fields are required');
            const user = await authServices.register({name,email,password,role});
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
                    role: user.role
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
}

module.exports = new authController();