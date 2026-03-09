const algorithmsService = require("../services/algorithmsService")

async function run(req,res,next){
    try {
        const userId = req.user.id
        const { algorithm, input } = req.body

        const result = await algorithmsService.runAndSaveAlgorithms({algorithm,input,userId})

        return res.status(201).json({
            success: true,
            message: "Algoritmo executado com sucesso",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

async function listAlgorithms(req,res,next) {
    try {
        const result = await algorithmsService.listAlgorithms()

        return res.status(200).json({
            success: true,
            message: "Algoritmos listados com sucesso",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { run, listAlgorithms }