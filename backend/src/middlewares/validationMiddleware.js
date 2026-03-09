exports.validateExecution = (schema) => {  // Exporta uma função que recebe um schema JOI no router

    return (req,res,next) => {  // Função interna que retorna o middleware, ou seja, a externa recebe o schema 
                                // e a interna recebe o req,res,next

        const { error } = schema.validate(req.body, { abortEarly: false }) // Valida o schema com os dados recebidos

        if(error){  //Se ela retornar erro, pega os detalhes do erro separdo por virgula
            const err = new Error(error.details.map((detail) => detail.message).join(", "))
            err.statusCode = 400
            return next(err)
        }
        next()
    }
}