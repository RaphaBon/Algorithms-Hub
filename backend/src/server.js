// Import app ( que cria o servidor)
const app = require('./app')

// Aqui apenas iniciamos
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
