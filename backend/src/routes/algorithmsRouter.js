const express = require('express')
const router = express.Router()

const algorithmsController = require('../controllers/algorithmsController')
const authMiddleware = require('../middlewares/authMiddleware')
const { validateExecution } = require('../middlewares/validationMiddleware') 
const { runAlgorithmSchema } = require('../validations/algorithmsValidator') 

router.use(authMiddleware)


router.get('/', algorithmsController.listAlgorithms)
router.post('/run', validateExecution(runAlgorithmSchema), algorithmsController.run)



module.exports = router