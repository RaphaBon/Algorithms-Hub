const algorithmService = require("../services/algorithmService")

async function run(req,res,next) {
    try {
        const userId = req.user.id 
        const { algorithm, input } = req.body

        // Vamos pegar o output (resposta), o tempo de execução e o registro (ID,CREATED_AT)
        const result = await algorithmService.runAndSave({algorithm, input, userId})
        

        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = { run }