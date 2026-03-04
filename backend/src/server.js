// Import app ( que cria o servidor)
const app = require('./app')

const PORT = process.env.PORT || 3000

// Aqui apenas iniciamos
app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000")
})
