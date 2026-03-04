const Joi = require('joi')

const executionSchema = Joi.object({
    // Definimos na nossa validação que todos os itens devem vir
    algorithm: Joi.string().min(3).max(100).required(), //tamanho min de 3 e maximo de 100
    input: Joi.string().required(),
    output: Joi.string().required(),
    execution_time: Joi.number().positive().required() //tempo precisa ser positivo
})

module.exports = executionSchema