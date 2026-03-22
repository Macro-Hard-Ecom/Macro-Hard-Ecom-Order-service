require('dotenv').config({ override: false })
const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB();

app.listen(5000, () => {
  console.log("Order Service running on port 5000");
});