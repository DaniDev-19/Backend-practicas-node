const { z } = require('zod');

const tallerSchema = z.object({
    codt: z.string().min(1).max(5, "El código no debe exceder 5 caracteres"),
    nombre: z.string().min(2).max(65, "Nombre demasiado largo"),
    ciudad: z.string().min(2).max(65, "Ciudad demasiado larga")
})

const updateSchema = tallerSchema.partial();

module.exports = tallerSchema, updateSchema;
