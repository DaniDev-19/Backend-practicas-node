const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const taxis = require('./routes/taxis.routes');
const clientes = require('./routes/clientes.routes');
const taller = require('./routes/taller.routes');
const observerHeader = require('./middleware/header');
const dbMiddleware = require('./middleware/db.middleware');
const logMiddleware = require('./middleware/log.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
const dataPath = path.join(__dirname, 'data', 'user.json');
const publicPath = path.join(__dirname, '..', 'public'); 

function readUsersFromFile() {
    try {
        if (!fs.existsSync(dataPath)) return [];
        const json = fs.readFileSync(dataPath, 'utf8');
        return json ? JSON.parse(json) : [];
    } catch (e) {
        console.error("Error leyendo archivo:", e);
        return [];
    }
}

function writeUsersToFile(users) {
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), 'utf8');
}

const corsOptions = { 
    origin: process.env.ALLOWED_ORIGINS || "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']
};

app.use(express.json());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet());



app.use(dbMiddleware);
app.use(logMiddleware);
app.use(observerHeader);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// RUTAS
app.get('/hello', (req, res) => res.send('Hola Servidor'));

app.get('/status', (req, res) => {
    const status = {
        status: 'OK',
        uptime: process.uptime(), 
        timestamp: new Date().toISOString(),
        node_version: process.version,
        memory_usage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB',
        env: process.env.NODE_ENV || 'development'
    };

    res.json(status);
});

app.get('/users', (req, res) => {
    res.json(readUsersFromFile());
});

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const users = readUsersFromFile();
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
});

app.post('/users', (req, res) => {
    const { name, edad } = req.body;
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });
    if (edad !== undefined && typeof edad !== 'number') return res.status(400).json({ error: 'La edad debe ser numérica' });
    
    const currentUsers = readUsersFromFile(); 
    const newUser = {
        id: currentUsers.length ? currentUsers[currentUsers.length - 1].id + 1 : 1,
        name,
        edad: edad || 0
    };

    currentUsers.push(newUser); 
    writeUsersToFile(currentUsers);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name, edad } = req.body;
    const currentUsers = readUsersFromFile();
    const index = currentUsers.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });

    currentUsers[index] = { ...currentUsers[index], name, edad: edad || currentUsers[index].edad };
    
    writeUsersToFile(currentUsers);
    res.json(currentUsers[index]);
});

app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const currentUsers = readUsersFromFile();
    const filteredUsers = currentUsers.filter(u => u.id !== id);

    if (currentUsers.length === filteredUsers.length) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    writeUsersToFile(filteredUsers);
    res.status(204).end();
});

app.use('/api', taxis); 
app.use('/api', clientes); 
app.use('/api', taller); 

app.use(errorMiddleware);


module.exports = app;