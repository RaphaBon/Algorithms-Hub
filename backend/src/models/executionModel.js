
const pool = require('../config/database')


exports.insertExecution = async (data, userId) => {

    
    const { algorithm, input, output, execution_time } = data
    
    
    const query = `INSERT INTO executions (algorithm, input, output, execution_time, user_id)
                    VALUES ($1, $2, $3, $4, $5) RETURNING *` 

    
    const values = [algorithm, input, output, execution_time, userId]

    
    const result = await pool.query(query, values)

    
    return result.rows[0]
}

exports.findByIdAndUser = async(id, userId) => {

    const query = `SELECT * FROM executions WHERE id = $1 AND user_id = $2`

    const result = await pool.query(query, [id, userId])

    return result.rows[0]
}

exports.updateExecution = async(id, userId, data) => {

    const {algorithm, input, output, execution_time} = data

    const query = `UPDATE executions 
                    SET  algorithm = $1,
                         input = $2,
                         output = $3,
                         execution_time = $4
                   WHERE id = $5 AND user_id = $6 RETURNING *`

    const values = [algorithm, input, output, execution_time, id, userId]

    const result = await pool.query(query, values) 

    return result.rows[0]
}

exports.deleteExecution = async(id, userId) => {

    const query = `DELETE FROM executions WHERE id = $1 AND user_id = $2`

    const result = await pool.query(query, [id, userId])

    return result.rowCount
}

exports.listByUser = async(userId) => {

    const query = `SELECT * FROM executions WHERE user_id = $1 ORDER BY created_at DESC`

    const result = await pool.query(query, [userId])

    return result.rows[0]

}