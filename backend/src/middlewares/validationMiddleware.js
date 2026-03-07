exports.validateExecution = (schema) => {  // Exporta uma função que recebe um schema JOI no router

    return (req,res,next) => {  // Função interna que retorna o middleware, ou seja, a externa recebe o schema 
                                // e a interna recebe o req,res,next

        const { error } = schema.validate(req.body) // Valida o schema com os dados recebidos

        if(error){  //Se ela retornar erro
            return res.status(400).json( 
                {message: "Dados inválidos",
                details: error.details[0].message}) //Lista de erros gerada pelo JOI
        }
        next()
    }
}