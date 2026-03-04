const executionSchema = require('../validations/executionValidator') //Pegamos a função de validação

exports.validateExecution = (req,res,next) => {
    const { error } = executionSchema.validate(req.body) //Chamamos a função e passamos os dados que vieram

    if(error){  //Se ela retornar erro
        return res.status(400).json( 
            {message: "Dados inválidos",
             details: error.details[0].message}) //Lista de erros gerada pelo JOI
    }

    next()  // Utilizamos ele,pois, se a função nao retornar erro:
            // router.post('/', validateExecution, executionController.insertExecution)
            //  Aqui na rota nós nao passariamos para a próxima função.
}