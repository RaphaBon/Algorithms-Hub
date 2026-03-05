const pool = require('../config/database')

async function createUser({ name, email, password}){

    // Query para inserir no bd
    const query = `INSERT INTO users (name, email, password) VALUES ($1,$2,$3) 
                    RETURNING id, name, email;`
    
    // Passando os valores com váriaveis para proteção
    const values = [name, email, password]

    const { rows } = await pool.query(query, values)
    return rows[0]
}


async function findUserByEmail(email){
    // Verifica se já existe algum usuário com o email enviado
    const query = `SELECT * FROM users WHERE email = $1`

    const values = [email]

    const { rows } = await pool.query(query, values)
    return rows[0]
}

module.exports = {createUser, findUserByEmail}