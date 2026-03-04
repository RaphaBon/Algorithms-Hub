const pool = require('../config/database')

async function createUser({ name, email, password}){

    const query = `INSERT INTO users (name, email, password) VALUES ($1,$2,$3) 
                    RETURNING id, name, email;`
    
    const values = [name, email, password]

    const { rows } = await pool.query(query, values)
    return rows[0]
}


async function findUserByEmail(email){

    const query = `SELECT * FROM users WHERE email = $1`

    const values = [email]

    const { rows } = await pool.query(query, values)
    return rows[0]
}

module.exports = {createUser, findUserByEmail}