import { Router } from 'express'
import User from '../models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('User already exists')
        }

        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            name,
            email,
            passwordHash
        })

        return res.status(201).json({name, email})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
})

authRouter.post('/login', async (req, res) => {
    //Obtem e-mail e password
    const { email, password } = req.body
    try {
        //Verifica se usuário existe
        const user = await User.findOne({email})
        //Se usuário não existe, lança erro
        if(!user) {
            throw new Error('User does not exists')
        }

        //Comparo a senha informada com o hash que está no BD
        if(!bcrypt.compareSync(password, user.passwordHash)) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        //Gerar um token JWT
        const expiresIn = process.env.JWT_EXPIRES
        const secret = process.env.JWT_SECRET

        const token = jwt.sign({ id: user._id, email: user.email }, secret, {expiresIn})

        //Retornar o token JWT
        return res.status(200).json({logged: true, jwt: token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'})
    }
    

})

export default authRouter