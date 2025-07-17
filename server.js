const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes'));


mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    app.listen(port, () => {console.log(`Server is running at http://localhost:${port}`);});
    console.log('Database connection established successfully');
  }
});

// Export the app for testing purposes
module.exports = app;
// To run the server, use the command: npm start
// For development, use: npm run start-dev
// To install dependencies, run: npm install        
// To initialize the project, run: npm init -y