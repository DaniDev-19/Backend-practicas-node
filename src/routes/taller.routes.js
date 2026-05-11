const { Router } = require('express');
const router = Router();
const tallerCtrl = require('../controllers/taller.controller');
const validateSchema = require('../middleware/validator.middleware');
const { tallerSchema } = require('../schemas/taller.schema');


router.post('/', validateSchema(tallerSchema), tallerCtrl.store);

module.exports = router;
