const createCliente = async (req, res, next) => {
    const {codc, nombre, apellido, ciudad} = req.body;
    try {      
        const existing = await req.db.query('SELECT 1 FROM cliente WHERE codc = $1 ', [codc]);

        if(existing.rows.length > 0){
            return res.status(409).json({
                status: 'error',
                message: 'El código ya esta registrado en un cliente'
            });
        }

        const result = await req.db.query('INSERT INTO cliente (codc, nombre, apellido, ciudad) VALUES ($1,$2,$3,$4) RETURNING *', [codc, nombre, apellido, ciudad]);

        return res.status(201).json(result.rows[0]);
        
    } catch (error) {
        console.error('Error al crear un cliente',error);
        return res.status(500).json({
            status: 'error',
            message: 'Error interno'
        });
        next(error);
    }
}

module.exports = {
    createCliente,
}