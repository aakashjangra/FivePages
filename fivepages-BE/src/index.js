import express from 'express'

const app = express()

app.get('/', (request, response) => {
  response.send('<h1>Hi from backend</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
