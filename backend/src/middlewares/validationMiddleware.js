exports.validateExecution = (schema) => {  

    return (req,res,next) => {  
                                

        const { error } = schema.validate(req.body, { abortEarly: false }) 

        if(error){  
            const err = new Error(error.details.map((detail) => detail.message).join(", "))
            err.statusCode = 400
            return next(err)
        }
        next()
    }
}