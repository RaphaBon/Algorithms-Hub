exports.errorHandler = (err, req, res, next) => {   

    console.error(err)

    const statuscode = err.statuscode || 500 

    res.status(statuscode).json({   
        success: false,
        message: err.message || "Erro interno no servidor"  
    })

}