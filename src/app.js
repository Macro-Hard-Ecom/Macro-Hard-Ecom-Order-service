const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const orderRoutes = require('./routes/orderRoutes');
const helmet = require('helmet');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/orders', orderRoutes);

module.exports = app;