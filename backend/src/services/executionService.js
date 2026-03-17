
const executionModel = require('../models/executionModel')


exports.createExecution = async (data, userId) => {
    
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
