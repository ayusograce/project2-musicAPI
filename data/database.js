const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database already initialized');
    return callback(null, database);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then(client => {
      database = client;
      callback(null, database);
    })
    .catch(err => {
      console.error('Database connection error:', err);
      return callback(err);
    });
};

const getDataBase = () => {
    if (!database) {
        throw new Error('Database not initialized. Call initDb first.');
    }
    return database;
    };

module.exports = {
  initDb,
  getDataBase
};