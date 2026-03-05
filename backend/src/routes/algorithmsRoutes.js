const express = require('express')
const router = express.Router()

const algorithmsController = require('../controllers/algorithmsController')
const authMiddleware = require('../middlewares/authMiddleware')
const { runAlgorithmSchema } = require('../validations/algorithmsValidator')

router.use(authMiddleware)

router.post('/run', runAlgorithmSchema, algorithmsController.run)

module.exports = router