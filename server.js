const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./src/config/db');
const morgan = require('morgan');
const security = require('./src/middlewares/security');
const authRoutes = require("./src/routes/auth")
const adminRoutes = require("./src/routes/admin");
const chatRoute = require("./src/routes/chat");
const chatbotRoute = require("./src/routes/chatbot");
const userRoute = require("./src/routes/users");
const colors = require('colors');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require('./swagger-output.json');
const errorHandler = require('./src/middlewares/errorHandler');
dotenv.config();

const app = express();

connectDb();

app.use(morgan('combined'))

security(app);
app.use(express.json());

app.use("/api/auth/", authRoutes)
app.use("/api/admin/", adminRoutes)
app.use("/api/chat/", chatRoute)
app.use("/api/chatbot/", chatbotRoute)
app.use("/api/user/", userRoute)

app.use(errorHandler)
//health check endpoint
app.get('/api/health', (req,res) =>{
    res.status(200).json({status: 'Api is Running successfully', timestamp: new Date().toISOString()});   
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`.yellow.bold);
})