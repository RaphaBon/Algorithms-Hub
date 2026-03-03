// Importamos o model que conversa com o bd
const executionModel = require('../models/executionModel')

// Função que vamos exportar. (assíncrona e passamos os dados do controller)
exports.createExecution = async (data) => {
    // Espera o model inserir a execution e salva a resposta dele
    const result = await executionModel.insertExecution(data)
    return result
}

exports.getExecutionById = async (id) => {
    const result = await executionModel.findById(id)
    return result
}

exports.updateExecution = async(id, data) => {
    const result = await executionModel.updateExecution(id, data)
    return result
}

exports.deleteExecution = async(id) => {
    const result = await executionModel.deleteExecution(id) 
    return result
}
