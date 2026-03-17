
require('dotenv').config()


const express = require('express')
const app = express()


const pool = require('./config/database')   
const executionRoutes = require('./routes/executionRoutes') 
const userRoutes = require("./routes/userRoutes")
const algorithmsRoutes = require('./routes/algorithmsRouter')
const { errorHandler } = require("./middlewares/errorHandler") 



app.use(express.json())


app.use('/api/executions', executionRoutes)
app.use('/auth', userRoutes)
app.use('/algorithms', algorithmsRoutes)


pool.connect().then(() => {
    console.log("Banco Conectado")
}).catch(err => {
    console.log("Erro banco:", err)
})


app.get('/', (req,res) => {
    res.send("Algorithms Hub Api Working Successfully") 
})

app.use(errorHandler) 


module.exports = app