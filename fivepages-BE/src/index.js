import express from 'express'
import userRoutes from './routes/user.routes.js'
import novelRoutes from './routes/novel.routes.js'
import chapterRoutes from './routes/chapter.routes.js'
import readlistRoutes from './routes/readlist.routes.js'
import likeRoutes from './routes/like.routes.js'
import commentRoutes from './routes/comment.routes.js'

import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js';
import { verifyJWT } from './middlewares/auth.middleware.js'

//loading environment variables
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Load it globally

const app = express()

//connect to database
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3003", // ✅ Set specific allowed origin
  credentials: true,
}));

app.use(cookieParser())

app.get('/api/v1/', (request, response) => {
  response.send('<h1>Hi from backend</h1>')
})

//routes
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/novels', novelRoutes);

app.use('/api/v1/chapters', chapterRoutes);

app.use('/api/v1/readlist', verifyJWT, readlistRoutes);

app.use('/api/v1/like', verifyJWT, likeRoutes);

app.use('/api/v1/comments', verifyJWT, commentRoutes);


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})