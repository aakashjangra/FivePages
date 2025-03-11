import express from 'express'
import userRoutes from './routes/user.routes.js'

//loading environment variables
import 'dotenv/config'

const app = express()

app.get('/api/v1/', (request, response) => {
  response.send('<h1>Hi from backend</h1>')
})

//routes
app.use('/api/v1/user', userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})


