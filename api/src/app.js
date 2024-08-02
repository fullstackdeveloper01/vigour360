const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const authRoute = require('./routes/auth.route');
const adminRoute = require('./routes/admin.route');
// const bodyParser = require('body-parser');

const { httpLogStream } = require('./utils/logger');

const app = express();

// app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(express.json());
// Swagger setup
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
// app.use(cors());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use('/api/', authRoute);
app.use('/api/admin/', adminRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

// app.use((err, req, res, next) => {
//     res.status(err.statusCode || 500).send({
//         status: "error",
//         message: err.message
//     });
//     next();
//});
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      res.status(400).send({ error: err.message });
    } else if (err) {
      // An unknown error occurred
      res.status(500).send({ error: err.message });
    } else {
      next();
    }
  });

module.exports = app;