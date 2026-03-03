// Permite criar rotas separadas do app principal
const express = require('express')
const router = express.Router()

// Importa os arquivos controller
const executionController = require('../controllers/executionController')

// Rota do tipo POST na url / chama a função createExectuion do arquivo executionControllers
router.post ('/', executionController.createExecution)
router.get ('/:id', executionController.getExecutionById)
router.put ('/:id', executionController.updateExecution)
router.delete ('/:id', executionController.deleteExecution)


// Exporta as rotas
module.exports = router