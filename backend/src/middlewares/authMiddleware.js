const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){

    // Pega o header (Authorization: bearer TOKEN)
    const authHeader = req.headers.authorization 

    // Se não exisitr
    if(!authHeader){
        return res.status(401).json({message: "Token não oferecido!"})
    }

    // O que era ("Bearer: 12kdsadjsaijd81wndua") vira ("Bearer", "jsnajndnasndcnaudcsac")
    const parts = authHeader.split(' ')

    if(parts.length !== 2){ //Se não houver apenas 2 elementos após o slipt
        return res.status(401).json({message: "Token mal formatado!"})
    }

    const [scheme, token] = parts // Pegamos as 2 parte do header

    if(scheme.toLowerCase() !== 'bearer') // Se a primeira nao for Bearer
    {
        return res.status(401).json({message: "Token mal formatado!"})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // JWT verifica aquele token com a nossa senha

        req.user = decoded // Com isso qualquer controller pode acessar req.user.id

        return next()

    } catch (error) {
        return res.status(401).json({message: "Token inválido ou expirado"})
    }
}

module.exports = authMiddleware