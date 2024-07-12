const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoute = require('./routes/auth.route');
const adminRoute = require('./routes/admin.route');

const { httpLogStream } = require('./utils/logger');

const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
//app.use('/api/admin/', adminRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});

module.exports = app;