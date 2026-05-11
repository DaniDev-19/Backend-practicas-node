const { z } = require('zod');

const createSchema = z.object({
    codc: z.string().min(3, 'Solo puedes poner 3 caracteres minimo').max(5, 'Maximo 5 caracteres'),
    nombre: z.string().min(3, 'Solo puedes poner 3 caracteres minimo').max(65, 'Maximo 65 caracteres'),
    apellido: z.string().min(3, 'Solo puedes poner 3 caracteres minimo').max(65, 'Maximo 65 caracteres'),
    ciudad: z.string().min(3, 'Solo puedes poner 3 caracteres minimo').max(65, 'Maximo 65 caracteres'),
});

const updateSchema = createSchema.partial();

module.exports = createSchema, updateSchema;