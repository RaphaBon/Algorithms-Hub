
const executionService = require('../services/executionService')

exports.createExecution = async(req,res,next) => {

    
    try {
        
        
        const {algorithm, input, output, execution_time } = req.body
        const userId = req.user.id

        
        
        const newExecution = await executionService.createExecution({
            algorithm,
            input,
            output,
            execution_time
        }, userId  
    )

        
            

        
        return res.status(201).json({
            success: true,
            message: "Execução criada com sucesso",
            data: newExecution
        })
    } catch (error) {
        next(error)
    }
}

exports.getExecutionByIdAndUser = async(req,res, next) => {

    try {
        const { id } = req.params 
        
        const userId = req.user.id 

        const execution = await executionService.getExecutionByIdAndUser(id, userId)

        if(!execution){
            const error = new Error("Execução não encontrada")
            error.statusCode = 404
            return next(error)
        }

        
        return res.status(200).json({
            success: true,
            message: "Execução encontrada com sucesso",
            data: execution
        })

    } catch (error) {
        next(error)
    }
}

exports.updateExecution = async(req,res, next) => {
    try {

        const {id} = req.params 
        const data = req.body 
        const userId = req.user.id 

        const updatedExecution = await executionService.updateExecution(id, userId, data)

        if (!updatedExecution) {
            const error = new Error("Execução não encontrada");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "Execução atualizada com sucesso",
            data: updatedExecution
        });

    } catch (error) {
         next(error)
    }
}

exports.deleteExecution = async(req,res, next) => {

    try {
        const {id} = req.params

        const userId = req.user.id

        const deletedExecution = await executionService.deleteExecution(id, userId)

        if (deletedExecution === 0) {
            const error = new Error("Execução não encontrada");
            error.statusCode = 404;
            return next(error);
        }

        return res.status(200).json({
            success: true,
            message: "Execução deletada com sucesso",
            data: null
        }); 

    } catch (error) {
        next(error)
    }
}

exports.listMine = async(req,res,next) => { 

    try {
        const userId = req.user.id 
        const executions = await executionService.listMine(userId)

        return res.status(200).json({
            success: true,
            message: "Execuções listadas com sucesso",
            data: executions
        });
        
    } catch (error) {
        next(error)
    }

}