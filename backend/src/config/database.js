const { Pool } = require('pg') // Importamos 

const pool = new Pool({ // Criamos a conexão com as informações la do env
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

module.exports = pool // Exportamos a conexão