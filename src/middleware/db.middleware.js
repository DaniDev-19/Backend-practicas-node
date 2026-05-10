const db = require('../config/db');

function dbInjector(req, res, next) {
    req.db = db;
    next();
}

module.exports = dbInjector;

