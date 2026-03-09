const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){

    // Pega o header (Authorization: bearer TOKEN)
    const authHeader = req.headers.authorization 

    // Se não exisitr
    if(!authHeader){
        const error = new Error("Token não oferecido")
        error.statusCode = 401
        throw error
    }

    // O que era ("Bearer: 12kdsadjsaijd81wndua") vira ("Bearer", "jsnajndnasndcnaudcsac")
    const parts = authHeader.split(' ')

    if(parts.length !== 2){ //Se não houver apenas 2 elementos após o slipt
        const error = new Error("Token mal formatado")
        error.statusCode = 401
        throw error
    }

    const [scheme, token] = parts // Pegamos as 2 parte do header

    if(scheme.toLowerCase() !== 'bearer') // Se a primeira nao for Bearer
    {
        const error = new Error("Token mal formatado")
        error.statusCode = 401
        throw error
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // JWT verifica aquele token com a nossa senha e salva 
                                                                  // os dados contidos dentro do token (id, nome ou email)

        req.user = decoded // Com isso qualquer controller que tenha a verificação do token pode acessar os dados do usuário

        return next()

    } catch (err) {
        const error = new Error("Token inválido ou expirado")
        error.statusCode = 401
        throw error
    }
}

module.exports = authMiddleware