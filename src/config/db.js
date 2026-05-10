const {Pool} = require('pg');
const {db} = require('./config.js');

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database,
});

console.log('Conectando a la base de datos:', db);

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error al conectar a la Base de Datos:', err);
    } else {
        console.error('Conexión exitosa a PostgreSQL:', res.rows[0].now);
    }
});

// pool.query('SELECT NOW()', (err, res) => {
//     if(err){
//         console.error('Error al conectar al base de datos', err);
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
};