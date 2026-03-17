const userService = require('../services/userService')


async function register(req, res, next) {   
    try {

        const user = await userService.register(req.body) 

        return res.status(201).json({
            success: true,
            message: "Usuário registrado com sucesso",
            data: user
        })
    } catch (error) {
        next(error)
    }
}


async function login(req, res, next) {
    try {
        
        const result = await userService.login(req.body) 
        
        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso",
            data: result
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {register, login}