const Joi = require('joi')

const runAlgorithmSchema = Joi.object({ //Regra de validação do body
    algorithm: Joi.string().trim().required(), // Deve ser textos.sem espaços no começo e fim / obrigatório
    input: Joi.any().required() // Input pode ser de qualquer tipo e obrigatório
})

module.exports = { runAlgorithmSchema }