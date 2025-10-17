const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))
    {
        return next();
    }
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);