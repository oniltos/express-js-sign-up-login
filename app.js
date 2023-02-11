import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.connection.js'
import booksRouter from './routes/books.routes.js'
import authRouter from './routes/auth.routes.js'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRouter)
app.use('/books', booksRouter)

const PORT = +process.env.PORT
app.listen(PORT, () => console.log('Server listening on port ', PORT))
