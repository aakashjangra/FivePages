import express from 'express'
import userRoutes from './routes/user.routes.js'
import novelRoutes from './routes/novel.routes.js'
import chapterRoutes from './routes/chapter.routes.js'
import readlistRoutes from './routes/readlist.routes.js'
import likeRoutes from './routes/like.routes.js'


import cors from 'cors'
import cookieParser from 'cookie-parser'

//loading environment variables
import 'dotenv/config'
import connectDB from './config/db.js';
import { verifyJWT } from './middlewares/auth.middleware.js'

const app = express()

//connect to database
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
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


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})