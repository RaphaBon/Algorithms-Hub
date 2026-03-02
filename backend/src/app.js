// Invocamos o express
const express = require('express')
// Chamamos a conexão com o banco
const pool = require("./database/connection")

// Cria o servidor
const app = express()

// Configura para ler arquivos .json
app.use(express.json())

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