// Permite criar rotas separadas do app principal
const express = require('express')
const router = express.Router()

// Importa os arquivos controller
const executionController = require('../controllers/executionController')

// Importa os middlewares
const { validateExecution } = require('../middlewares/validationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

// Aplicamos o middleware de verificar o token em todas as rotas
// Se o token estiver correto, next() e continua o ciclo
// Se estiver inválido, interrompe o ciclo e manda o erro
router.use(authMiddleware)

// endpoint para que um usuário X crie um execution
router.post ('/',  validateExecution, executionController.createExecution) 

// endpoint para listar TODAS executions de um usuário X
router.get('/', executionController.listMine) 

// endpoint para listar X executions de X usuário
router.get ('/:id', executionController.getExecutionByIdAndUser) 

// endpoint para editar X execution de X usuário
router.put ('/:id', validateExecution, executionController.updateExecution) 

// " " deletar X execution de X usuário
router.delete ('/:id', executionController.deleteExecution) 


// Exporta as rotas
module.exports = router