
const errorHandler = (err, req, res, next) => {
    console.error("=== ERROR LOG ===");
    console.error(err.stack); 

    if (err.code === '23505') {
        err.statusCode = 409;
        err.message = 'Ya existe un registro con esos datos (Campo duplicado)';
    }

    if (err.code === '23503') { 
        err.statusCode = 400;
        err.message = 'No se puede realizar la operación: referencia no válida';
    }

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Error del Servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};

const ErrorCustom = ({status, code = 500, message = 'Not Found'} = {}) => {
    return {
        status: status,
        code: code,
        message: message,
    }
};

module.exports = errorHandler, ErrorCustom;

