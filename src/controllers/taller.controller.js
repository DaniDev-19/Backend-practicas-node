const tallerService = require('../services/taller.services');

const store = async (req, res, next) => {
    try {
        const { codt } = req.body;

        const existe = await tallerService.findTallerByCod(req.db, codt);
        if (existe) {
            return res.status(409).json({ message: 'El código de taller ya existe' });
        }

        const nuevoTaller = await tallerService.createTallerDB(req.db, req.body);
        res.status(201).json(nuevoTaller);
    } catch (error) {
        next(error); 
    }
};

module.exports = { store };
