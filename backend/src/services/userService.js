const userModel = require('../models/userModel')

// Importamos o bcrypt e o JWT
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10

async function register({name, email, password}){
    
    const userExists = await userModel.findUserByEmail(email)

    if(userExists){
        throw new Error('Email já cadastrado!')
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await userModel.createUser({
        name,
        email,
        password: hashedPassword
    })

    return user
}

async function login({email, password}){

    const user = await userModel.findUserByEmail(email)

    if(!user){
        throw new Error('Credenciais inválidas!')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
        throw new Error('Credenciais inválidas!')
    }

    // Aqui cria o token
    const token = jwt.sign(
        {id: user.id},  // Atribui: este token pertence a este usuário
        process.env.JWT_SECRET, // Chave secreta para gerar assinatura
        { expiresIn: '1h'} // Este token expira em 1 hora, depois precisa do login denovo
    )  

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    }
}

module.exports = {register,login}