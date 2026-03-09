// Import do arquivo executionService 
const executionService = require('../services/executionService')

exports.createExecution = async(req,res,next) => {

    // Try-Catch para tratamento de erro
    try {
        
        // Pegamos todos os dados que vieram  do body
        const {algorithm, input, output, execution_time } = req.body
        const userId = req.user.id

        // Chamamos a função createExecution (executa a lógica/salva no banco/retorna o resultado) lá do executionService 
        // passando esses dados e esperamos a resposta para proseguir
        const newExecution = await executionService.createExecution({
            algorithm,
            input,
            output,
            execution_time
        }, userId  // Passamos o ID que vem do token via authMiddleware
    )

        // Se deu certo, passamos essa nova execução com a resposta, EX:
            /** Um objeto com os dados salvos no banco.
                {
                "id": 1,
                "algorithm": "Bubble Sort",
                "input": "5,3,2",
                "output": "2,3,5",
                "execution_time": 10
                }
         * 
         */

        // Como esstamos criando algo usa-se 201
        return res.status(201).json({
            success: true,
            message: "Execução criada com sucesso",
            data: newExecution
        })
    } catch (error) {
        next(error)
    }
}

exports.getExecutionByIdAndUser = async(req,res, next) => {

    try {
        const { id } = req.params // req.params pq o id vem da url e nao do body
        
        const userId = req.user.id // pegamos o ID do usuário via token

        const execution = await executionService.getExecutionByIdAndUser(id, userId)

        if(!execution){
            const error = new Error("Execução não encontrada")
            error.statusCode = 404
            return next(error)
        }

        // Como nao criamos nada, apenas 200
        return res.status(200).json({
            success: true,
            message: "Execução encontrada com sucesso",
            data: execution
        })

    } catch (error) {
        next(error)
    }
}

exports.updateExecution = async(req,res, next) => {
    try {

        const {id} = req.params // Pegando o ID 
        const data = req.body // Pegando os dados do body
        const userId = req.user.id // Pegando o id do usuário

        const updatedExecution = await executionService.updateExecution(id, userId, data)

        if (!updatedExecution) {
            const error = new Error("Execução não encontrada");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "Execução atualizada com sucesso",
            data: updatedExecution
        });

    } catch (error) {
         next(error)
    }
}

exports.deleteExecution = async(req,res, next) => {

    try {
        const {id} = req.params

        const userId = req.user.id

        const deletedExecution = await executionService.deleteExecution(id, userId)

        if (deletedExecution === 0) {
            const error = new Error("Execução não encontrada");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "Execução deletada com sucesso",
            data: null
        }); 

    } catch (error) {
        next(error)
    }
}

exports.listMine = async(req,res,next) => { // Pega todas as executions de um usuário X

    try {
        const userId = req.user.id // pegamos o id do usuário via token
        const executions = await executionService.listMine(userId)

        return res.status(200).json({
            success: true,
            message: "Execuções listadas com sucesso",
            data: executions
        });
        
    } catch (error) {
        next(error)
    }

}