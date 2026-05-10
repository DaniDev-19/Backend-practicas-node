const getAllTaxis = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const offset = (page - 1) * limit;

        const queryText = 'SELECT * FROM taxi ORDER BY placa DESC LIMIT $1 OFFSET $2';
        const result = await req.db.query(queryText, [limit, offset]);

        const countQuery = 'SELECT COUNT(*) FROM taxi';
        const totalResult = await req.db.query(countQuery);
        const totalItems = parseInt(totalResult.rows[0].count);

        return res.status(200).json({
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
            data: result.rows
        });
    } catch (error) {
        console.error('Error al obtener los taxis', error);
        return next(error);
    }
};

const getTaxisById = async (req, res, next) => {
    const { placa } = req.params;
    
    if (isNaN(placa)) {
    return res.status(400).json({ message: 'El ID proporcionado no es válido' });
}
    try {
        const result = await req.db.query('SELECT * FROM taxi WHERE placa = $1', [placa]);

    if(result.rows.length === 0) {
        return res.status(404).json({
            status:'error',
            message: 'Taxi no encontrado o no existe',
        });
    }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(`Error al Obtener el taxi con id> ${placa}`, error);
        return next(error);
    }
}

const createTaxi = async (req, res, next) => {
    try {
        const {placa, marca, modelo} = req.body;

        if(!placa || !modelo || marca) {
            return res.status(400).json({
                status: 'error',
                message: 'Todos los campos (placa, marca, modelo) son obligatorios',
            })
        }

        const existingTaxi = await req.db.query('SELECT 1 FROM taxi WHERE placa = $1', [placa]);

        if(existingTaxi.rows.length > 0) {
            return res.status(409).json({
                status: 'error',
                message: 'Error la Placa ya esta registrada'
            })
        }

        const result = await req.db.query('INSERT INTO taxi (placa,marca,modelo) VALUES($1,$2,$3) RETURNING*', [placa,marca,modelo]);

        return res.status(201).json({
            status: 'success',
            message:'taxi creado correctamente',
            data: result.rows[0]
        });
        
    } catch (error) {
        console.error('Error al crear el taxi', error);
        return next(error);
    }
}

const updateTaxi = async (req, res, next) => {
    const { placa } = req.params;
    const { placa: nuevaPlaca, marca, modelo } = req.body;

    if (!placa) {
        return res.status(400).json({
            status: 'error',
            message: 'Placa no válida',
        });
    }

    if (!nuevaPlaca || !marca || !modelo) {
        return res.status(400).json({
            status: 'error',
            message: 'Todos los campos (placa, marca, modelo) son obligatorios',
        });
    }

    try {
        const existingPlaca = await req.db.query(
            'SELECT 1 FROM taxi WHERE placa = $1 AND placa <> $2',
            [nuevaPlaca, placa]
        );

        if (existingPlaca.rows.length > 0) {
            return res.status(409).json({
                status: 'error',
                message: 'La placa ya existe en otro taxi'
            });
        }

        const result = await req.db.query(
            'UPDATE taxi SET placa=$1, marca=$2, modelo=$3 WHERE placa=$4 RETURNING *',
            [nuevaPlaca, marca, modelo, placa]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontró el taxi para actualizar'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Taxi actualizado correctamente',
            data: result.rows[0],
        });
    } catch (error) {
        console.error(`Error al intentar actualizar el taxi con placa: ${placa}`, error);
        return next(error);
    }
};

const deleteTaxi = async (req, res, next) => {
    const {placa} = req.params;

    if (!placa) {
        return res.status(400).json({ status: 'error', message: 'Placa no válida' });
    }

    try {
        const result = await req.db.query('DELETE FROM taxi WHERE placa = $1',[placa]);

        if(result.rowCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Error no existe o se puede encontrar el taxi'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: `Taxi con id ${placa} eliminado correctamente`
        });

    } catch (error) {
        console.error(`Error al intentan eliminar el taxi con id: ${placa}`)
        return next(error);
    }
}

module.exports = {
    getAllTaxis,
    getTaxisById,
    createTaxi,
    updateTaxi,
    deleteTaxi,
}