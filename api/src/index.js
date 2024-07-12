const app = require('./app');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    logger.info(`Running on PORT ${PORT}`);
    console.log(`Running on PORT ${PORT}`);
});
