const express = require('express')
const router = express.Router()

const algorithmsController = require('../controllers/algorithmsController')
const authMiddleware = require('../middlewares/authMiddleware')
const { validateExecution } = require('../middlewares/validationMiddleware') // Validação genérica
const { runAlgorithmSchema } = require('../validations/algorithmsValidator') // Importa a validação do algorithm e do input

router.use(authMiddleware)

// Passa pela autenticação, valida o algoritmh passado, e cai no controller
router.post('/run', validateExecution(runAlgorithmSchema), algorithmsController.run)

module.exports = router