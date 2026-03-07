const algorithmsService = require("../services/algorithmsService")

async function run(req,res,next){
    try {
     
        const userId = req.user.id
        const { algorithm, input } = req.body

        const result = await algorithmsService.runAndSaveAlgorithms({algorithm,input,userId})

        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = { run }