// Importamos o model que conversa com o bd
const executionModel = require('../models/executionModel')

// Função que vamos exportar. (assíncrona e passamos os dados do controller)
exports.createExecution = async (data, userId) => {
    // Espera o model inserir a execution E O ID DO USUÁRIO EM QUESTÃO e salva a resposta dele
    const result = await executionModel.insertExecution(data, userId)
    return result
}

exports.getExecutionByIdAndUser = async (id, userId) => {
    const result = await executionModel.findByIdAndUser(id, userId)
    return result
}

exports.updateExecution = async(id, userId, data) => {
    const result = await executionModel.updateExecution(id, userId, data)
    return result
}

exports.deleteExecution = async(id, userId) => {
    const result = await executionModel.deleteExecution(id, userId) 
    return result
}

exports.listMine = async(userId) => {
    const result = await executionModel.listByUser(userId)
    return result
}
