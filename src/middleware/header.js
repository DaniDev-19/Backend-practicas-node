const headerMiddleware = (req, res, next) => {
    const clientIp = req.ip.split(':').pop();
    console.log(`La ip del Cliente es: ${clientIp}`)
    console.log(req.headers);
    next();
}

module.exports = headerMiddleware;