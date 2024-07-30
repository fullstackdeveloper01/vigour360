const { decode: decodeToken } = require('../utils/token');

module.exports = async (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        return res.status(401).json({
            status: 'error',
            message: 'No token provided or invalid token format'
        });
    }

    // Attach the token to the request object for further use
    req.token = token;
    var decoded  = await decodeToken(token);
    if (decoded.error) {
        return res.status(401).json({
            status: 'error',
            message: decoded.error
        });
    }
    // Attach the decoded token to the request object for further use
    req.userId = decoded.id;
    // Call the next middleware or route handler
    next();
};
