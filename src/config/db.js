const {Pool} = require('pg');
const {db} = require('./config.js');

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port || 5432,
    database: db.database,
    // ssl: {
    //     rejectUnauthorized: false 
    // }
});

// console.log('Conectando a la base de datos:', db);

const connectDB = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        if (result.rows.length > 0) {
    console.log(result.rows[0].now);
}
        console.log('Conexión exitosa a la DB:', result.rows[0].now);
        console.log('Conectando a la base de datos:', db);
        return pool; 
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error.message);
        // process.exit(1);  Detiene todo si la DB falla
    }
};

// pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//         console.error('Error al conectar a la Base de Datos:', err);
//     } else {
//         console.log('Conexión exitosa a PostgreSQL:', res.rows[0].now);
//     }
// });


function query (text, params){
    return pool.query(text, params);
}

function getClient () {
    return pool.connect();
}

module.exports = {
    query,
    getClient,
    connectDB,
};