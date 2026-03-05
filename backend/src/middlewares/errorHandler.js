const { message } = require("../validations/executionValidator")

exports.errorHandler = (err, req, res, next) => {   //4 parametros para o express identificar que é de erro

    console.error(err)

    const statuscode = err.statuscode || 500 // Se o erro tiver um código personalizado ele usa, se nao, usa 500.

    res.status(statuscode).json({   // Aqui manda o erro e uuma mensagem, personalizada ou não.
        message: err.message || "Erro interno no servidor"  // Personalizada seria: throw new Error ("...")
    })

}