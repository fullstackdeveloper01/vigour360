const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for the Node.js application',
    },
    servers: [
      {
        url: 'http://localhost:8088', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
