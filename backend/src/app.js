// Arquivo env
require('dotenv').config()

// Invocamos o express e cria o servidor
const express = require('express')
const app = express()

// Imports
const pool = require('./config/database')   // Conexão com o banco
const executionRoutes = require('./routes/executionRoutes') // Rotas
const userRoutes = require("./routes/userRoutes")
const { errorHandler } = require("./middlewares/errorHandler") // Middleware de erro global

// Configura para ler arquivos .json
app.use(express.json())

// Com isso, a rota final será POST http://localhost:3000/api/nomedarota
app.use('/api/executions', executionRoutes)
app.use('/auth', userRoutes)

// Conectamos com o banco
pool.connect().then(() => {
    console.log("Banco Conectado")
}).catch(err => {
    console.log("Erro banco:", err)
})

// Primeira rota (localhost:3000/)
app.get('/', (req,res) => {
    res.send("Algorithms Hub Api Working Successfully") // Dar a resposta
})

app.use(errorHandler) // Configuramos para usar o middleware

// Exporta para o server.js inicializar
module.exports = app