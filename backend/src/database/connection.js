const { Pool } = require('pg') // Importamos 

const pool = new Pool({ // Criamos a conexão com as informações
    user: 'postgres',
    host: 'localhost',
    database: 'algorithms_hub',
    password: 'postgres',
    port: 5432
})

module.exports = pool // Exportamos a conexão