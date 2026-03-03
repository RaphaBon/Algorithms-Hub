// Invocamos o express e cria o servidor
const express = require('express')
const app = express()

// Imports
const pool = require("./database/connection")   // Conexão com o banco
const executionRoutes = require('./routes/executionRoutes') // Rotas

// Configura para ler arquivos .json
app.use(express.json())

// Com isso, a rota final será POST http://localhost:3000/api/nomedarota
app.use('/api/executions', executionRoutes)

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

// Exporta para o server.js inicializar
module.exports = app