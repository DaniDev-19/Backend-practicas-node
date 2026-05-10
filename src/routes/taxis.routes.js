const {Router} = require('express');
const {getAllTaxis, createTaxi, getTaxisById, deleteTaxi, updateTaxi} = require('../controllers/taxis.controller');
const router = Router();

router
    .route('/taxis')
    .get(getAllTaxis)
    .post(createTaxi);

router
    .route('/taxis/:placa')
    .get(getTaxisById)
    .put(updateTaxi)
    .delete(deleteTaxi);

module.exports = router;