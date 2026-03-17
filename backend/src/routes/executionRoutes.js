
const express = require('express')
const router = express.Router()


const executionController = require('../controllers/executionController')


const { validateExecution } = require('../middlewares/validationMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')




router.use(authMiddleware)


router.post ('/',  validateExecution, executionController.createExecution) 


router.get('/', executionController.listMine) 


router.get ('/:id', executionController.getExecutionByIdAndUser) 


router.put ('/:id', validateExecution, executionController.updateExecution) 


router.delete ('/:id', executionController.deleteExecution) 



module.exports = router