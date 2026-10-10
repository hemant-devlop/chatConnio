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
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: config.app.clientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",  config.app.clientUrl);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// app.use(cors(config.security.cors))
// const allowedOrigins = [
//   "http://localhost:3000"                    
// ];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));
// app.options("/*any",cors(config.security.cors))



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