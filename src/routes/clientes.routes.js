const {Router} = require('express');
const validateSchema = require('../middleware/validator.middleware');
const { createSchema, updateSchema } = require('../schemas/clientes.schema');
const {createCliente} = require('../controllers/clientes.controller');

const router = Router();

router 
    .route('/cliente')
    .post(validateSchema(createSchema), createCliente);

module.exports = router;