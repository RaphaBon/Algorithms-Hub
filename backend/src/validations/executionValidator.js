const Joi = require('joi')

const executionSchema = Joi.object({
    
    algorithm: Joi.string().min(3).max(100).required(), 
    input: Joi.string().required(),
    output: Joi.string().required(),
    execution_time: Joi.number().positive().required(), 
    user_id: Joi.forbidden() 
})

module.exports = executionSchema