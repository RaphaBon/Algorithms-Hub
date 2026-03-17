const algorithmsRegistry  = require("../algorithms/registry") 
const executionsModel = require("../models/executionModel") 
const { performance } = require('perf_hooks') 


function normalizeAlgorithmName(name){
    return name.trim().replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s-]+/g, '_').toLowerCase()
}

async function runAndSaveAlgorithms({algorithm, input, userId}) {
    
    const normalizeAlgorithm = normalizeAlgorithmName(algorithm) 
    const algorithmEntry = algorithmsRegistry[normalizeAlgorithm] 

    if(!algorithmEntry){ 
        const error = new Error("Algoritmo não suportado!!")
        error.statusCode = 400
        throw error 
    }

    const { validator } = algorithmEntry

    if(typeof validator === "function"){
        validator(input)
    }

    

    const startTime = performance.now()
    const output = algorithmEntry.runner(input)
    const endTime = performance.now()

    const executionTime = endTime - startTime

    const savedExecution = await executionsModel.insertExecution({ 
                                                                   
        algorithm: normalizeAlgorithm,
        input: JSON.stringify(input),   
        output: JSON.stringify(output),
        execution_time: executionTime,
    }, userId
)

    return {    
        ...savedExecution,
        output
    }
}

async function listAlgorithms(){
    
    return Object.values(algorithmsRegistry).map((algorithm) => ({
        name: algorithm.name,
        displayName: algorithm.displayName,
        description: algorithm.description,
    }))
    
}

module.exports = { runAndSaveAlgorithms, listAlgorithms } 