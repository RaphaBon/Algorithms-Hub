const userService = require('../services/userService')

// Função para registar o usuário
async function register(req, res, next) {   
    try {

        const user = await userService.register(req.body) // Passamos o body para a função de register la no service
        res.status(200).json(user)

    } catch (error) {
        next(error)
    }
}

// Função de login 
async function login(req, res, next) {
    try {
        
        const result = await userService.login(req.body) // Passamos o body para a função de login la no service
        res.status(200).json(result)

    } catch (error) {
        next(error)
    }
}

// Exporta tanto o register quanto o login
module.exports = {register, login}