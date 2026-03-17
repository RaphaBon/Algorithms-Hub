const userModel = require('../models/userModel')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10

async function register({name, email, password}){
    
    const userExists = await userModel.findUserByEmail(email)

    if(userExists){
        const error = new Error("Email já cadastrado")
        error.statusCode = 400
        throw new error
    }
    
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    
    const user = await userModel.createUser({
        name,
        email,
        password: hashedPassword
    })
    
    return res.status(201).json({
        success: true,
        message: "Usuário registrado com sucesso",
        data: user
    })
}

async function login({email, password}){
    
    const user = await userModel.findUserByEmail(email)

    if(!user){
        const error = new Error("Credenciais inválidas")
        error.statusCode = 400
        throw new error
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        const error = new Error("Credenciais inválidas")
        error.statusCode = 400
        throw new error
    }

    
    const token = jwt.sign(
        {id: user.id},  
        process.env.JWT_SECRET, 
        { expiresIn: '1h'} 
    )  

    return res.status(200).json({
    success: true,
    message: "Login realizado com sucesso",
    data: {
        user: {
        id: user.id,
        name: user.name,
        email: user.email
        },
        token
    }
    });
}

module.exports = {register,login}