// Chamamos a conexeção com o banco
const pool = require('../database/connection')

// Função que vamos exportar e os dados
exports.insertExecution = async (data) => {

    // Desestrutura os dados:
    const { algorithm, input, output, execution_time } = data

    // query que vai ser executada no banco
    const query = `INSERT INTO executions (algorithm, input, output, execution_time)
                    VALUES ($1, $2, $3, $4) RETURNING *` //Returning serve para retornamos todos os dados (os que o Postgre criou)

    // Esses são os dados que vao ser passado em $1/$2/$3/$4
    const values = [algorithm, input, output, execution_time]

    // Esperamos a inserção
    const result = await pool.query(query, values)

    // Pegamos só o que está dentro de rows, e não todo o objeto retornado pelo bd
    return result.rows[0]
}

exports.findById = async(id) => {

    const query = `SELECT * FROM executions WHERE id = $1`

    const result = await pool.query(query, [id])

    return result.rows[0]
}

exports.updateExecution = async(id, data) => {

    const {algorithm, input, output, execution_time} = data

    const query = `UPDATE executions 
                    SET  algorithm = $1,
                         input = $2,
                         output = $3,
                         execution_time = $4
                   WHERE id = $5 RETURNING *`

    const values = [algorithm, input, output, execution_time, id]

    const result = await pool.query(query, values) 

    return result.rows[0]
}

exports.deleteExecution = async(id) => {

    const query = `DELETE FROM executions WHERE id = $1`

    const result = await pool.query(query, [id])

    return result.rowCount
}