import { Router } from 'express'
import Book from '../models/Book.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'

const booksRouter = Router()

booksRouter.post('/', isAuthenticatedMiddleware, async (req, res) => {
    const payload = req.body

    try {
        const newBook = await Book.create(payload)
        return res.status(201).json(newBook)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

booksRouter.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json(books)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

export default booksRouter 
