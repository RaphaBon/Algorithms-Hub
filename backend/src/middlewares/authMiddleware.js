const jwt = require('jsonwebtoken')

function authMiddleware(req,res,next){

    
    const authHeader = req.headers.authorization 

    
    if(!authHeader){
        const error = new Error("Token não oferecido")
        error.statusCode = 401
        throw error
    }

    
    const parts = authHeader.split(' ')

    if(parts.length !== 2){ 
        const error = new Error("Token mal formatado")
        error.statusCode = 401
        throw error
    }

    const [scheme, token] = parts 

    if(scheme.toLowerCase() !== 'bearer') 
    {
        const error = new Error("Token mal formatado")
        error.statusCode = 401
        throw error
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
                                                                  

        req.user = decoded 

        return next()

    } catch (err) {
        const error = new Error("Token inválido ou expirado")
        error.statusCode = 401
        throw error
    }
}

module.exports = authMiddleware