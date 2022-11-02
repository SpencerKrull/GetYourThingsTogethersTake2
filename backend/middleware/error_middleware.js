const error = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.
    statusCode : 500
    res.status(500)

    res.json({ message: err.message, 
        stack: process.env.NODE_ENV === 'development' ? err.stack : null }) // shows error stack if node = dev
}; // "next" will trigger the next middleware

module.exports = error;