const Joi = require('joi')

const runAlgorithmSchema = Joi.object({ 
    algorithm: Joi.string().trim().required(), 
    input: Joi.any().required() 
})

module.exports = { runAlgorithmSchema }