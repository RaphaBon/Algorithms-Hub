const { getAlgorithmRunner } = require("../algorithms/registry") // Importa o catalogo
const executionsModel = require("../models/executionModel") // Importa a tabela do execution para salvar os dados
const { performance } = require('perf_hooks') // Ferramenta do Node que mede o tempo com mais precisão

// Função para padrozinar o nome do algoritmo.
function normalizeAlgorithmName(name){
    return name.trim().replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase()
}

//Async pois interage com o banco pegando um objeto com algorithm, input e o id do usuário que passou
async function runAndSaveAlgorithms({algorithm, input, userId}) {
    
    const normalizeAlgorithm = normalizeAlgorithmName(algorithm) // PAdrozina o nome do algoritmo
    const runner = getAlgorithmRunner(normalizeAlgorithm) // Busca no registry qual função corresponde ao nome enviado

    if(!runner){ // Se nao teve resposta, passamos os dados do erro
        const error = new Error("Algoritmo não suportado!!")
        error.statusCode = 400
        throw error 
    }

    /** Para vermos o tempo de resposta, pegamos o tempo atual com a ferramenta do node.
     *  Chamamos a função de runner que já tem o nome do algoritmo, entao agora só passamos o input
     *  Pegamos o tempo  após chegar a resposta
     *  
     *  O tempo de execução será a diferença entre o momento que enviamos o input até o momento que recemos a resposta
     */

    const startTime = performance.now()
    const output = runner(input)
    const endTime = performance.now()

    const executionTime = endTime - startTime

    const savedExecution = await executionsModel.insertExecution({ // Função de inserir uma execution no bd passando os dados processados
                                                                   // e pegando a resposta dela para mostrar ao usuário
        algorithm: normalizeAlgorithm,
        input: JSON.stringify(input),   //JSON.stringify para transformar o objeto JS em texto JSON
        output: JSON.stringify(output),
        execution_time: executionTime,
    }, userId
)

    return {    // Retorna o que foi salvo no banco e o output ja pronto como objeto JS
        ...savedExecution,
        output
    }
}

module.exports = { runAndSaveAlgorithms } // Exportamos a resposta de volta para o controller