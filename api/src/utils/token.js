const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const { logger } = require('./logger');

const generate = (id) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1d'});

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            logger.error('Token has expired');
            return { error: 'Token has expired' };
        } else {
            logger.error(error);
            return { error: 'Invalid token' };
        }
    }
};

module.exports = {
    generate,
    decode
}