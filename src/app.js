import express from 'express'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
import config from './config/index.js';
import conversationRoutes from './routes/conversation.route.js'
import userRoutes from './routes/user.route.js'
import messageRoutes from './routes/message.route.js'
const app=express()
app.use(express.json());

// app.use(cors(config.security.cors))
const allowedOrigins = [
  "http://localhost:3000"                    
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
// app.options("/*any",cors(config.security.cors))

app.use(cookieParser());

app.get('/api/helth',(req,res)=>{
    res.json({
        success:true,
        message:"server is running"
    })
});
app.use('/api/auth',authRoutes)
app.use('/api/chat',conversationRoutes)
app.use('/api/user',userRoutes)
// app.use('/api/messages',messageRoutes)


export default app;