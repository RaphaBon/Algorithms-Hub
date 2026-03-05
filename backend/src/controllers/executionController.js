// Import do arquivo executionService 
const { listExecution } = require('../services/executionService')
const executionService = require('../services/executionService')
const { error } = require('../validations/executionValidator')

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
        res.status(201).json(newExecution)
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
            return res.status(404).json({error: "Execução não encontrada!"})
        }

        // Como nao criamos nada, apenas 200
        return res.status(200).json(execution)

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

        if(!updatedExecution){
            return res.status(404).json({ message: "Execução não encontrada!"})
        }

        res.status(200).json(updatedExecution)

    } catch (error) {
         next(error)
    }
}

exports.deleteExecution = async(req,res, next) => {

    try {
        const {id} = req.params

        const userId = req.user.id

        const deletedExecution = await executionService.deleteExecution(id, userId)

        if(deletedExecution === 0){
            return res.status(404).json({message: "Remoção não encontrada!"})
        }    
        
        res.status(200).json({message: "Execução deletada com sucesso!"})    

    } catch (error) {
        next(error)
    }
}

exports.listMine = async(req,res,next) => { // Pega todas as executions de um usuário X

    try {
        const userId = req.user.id // pegamos o id do usuário via token
        const executions = await executionService.listMine(userId)

        if(!executions){
             return res.json({message: "Voce não tem nenhuma execution ainda!"})
        }

        return res.json(executions) 
    } catch (error) {
        next(error)
    }

}