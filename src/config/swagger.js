const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Service API',
      version: '1.0.0',
      description: 'Order Service for E-Commerce Microservices System',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
      {
        url: 'http://<your-ec2-ip>:5000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);