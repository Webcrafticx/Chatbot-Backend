const mongoose = require("mongoose");
const logger = require("./logger");
const connectDb = async() => {
    try{
        const conn =await mongoose.connect(process.env.MONGO_URL);
        console.log(`database Connected:`.blue.bold);
        
    } catch(error){
        logger.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = connectDb;