// Import do arquivo executionService 
const { listExecution } = require('../services/executionService')
const executionService = require('../services/executionService')

// Função assíncrona (para esperar a resposta), que está sendo exportada para outros arquivos usarem ( como a routes )
exports.createExecution = async(req,res) => {

    // Try-Catch para tratamento de erro
    try {
        
        // Pegamos todos os dados que vieram  do body
        const {algorithm, input, output, execution_time } = req.body

        // Chamamos a função createExecution (executa a lógica/salva no banco/retorna o resultado) lá do executionService 
        // passando esses dados e esperamos a resposta para proseguir
        const newExecution = await executionService.createExecution({
            algorithm,
            input,
            output,
            execution_time
        })

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
    } catch (err) {
        console.error(err)
        return res.status(500).json({err: "Erro ao criar execução"})
    }
}

exports.getExecutionById = async(req,res) => {

    try {
        const { id } = req.params //req.params pq o id vem da url e nao do body

        const execution = await executionService.getExecutionById(id)

        if(!execution){
            return res.status(404).json({error: "Execução não encontrada!"})
        }

        // Como nao criamos nada, apenas 200
        return res.status(200).json(execution)

    } catch (err) {
        console.log(err)
        return res.status(500).json({err: "Erro ao buscar essa execution"})
    }
}

exports.updateExecution = async(req,res) => {
    try {

        const {id} = req.params // Pegando o ID 
        const data = req.body // Pegando os dados do body

        const updatedExecution = await executionService.updateExecution(id, data)

        if(!updatedExecution){
            return res.status(404).json({ message: "Execução não encontrada!"})
        }

        res.status(200).json(updatedExecution)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Erro ao atualizar essa execução!"})
    }
}

exports.deleteExecution = async(req,res) => {

    try {
        const {id} = req.params

        const deletedExecution = await executionService.deleteExecution(id)

        if(deletedExecution === 0){
            return res.status(404).json({message: "Remoção não encontrada!"})
        }    
        
        res.status(200).json({message: "Execução deletada com sucesso!"})    

    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Erro ao deletar essa execução!"})
    }
}