const app = require('./app');
const {connectDB} = require('./config/db');

const PORT = process.env.PORT || 3000;


const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(PORT, () => {
            console.log('Servidor listo en el puerto 3000');
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
// app.listen(PORT, () => {
//     await connetdb();
//     console.log(`Servidor en puerto: ${PORT}`)
// });
