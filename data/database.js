const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;







// Connect to MongoDB
// const MongoClient = require('mongodb').MongoClient;

// let database;

// const initDb = (callback) => {
//   if (database) {
//     console.log('Database already initialized');
//     return callback(null, database);
//   }

//   MongoClient.connect(process.env.MONGODB_URI)
//     .then(client => {
//       database = client;
//       callback(null, database);
//     })
//     .catch(err => {
//       console.error('Database connection error:', err);
//       return callback(err);
//     });
// };

// const getDataBase = () => {
//     if (!database) {
//         throw new Error('Database not initialized. Call initDb first.');
//     }
//     return database;
//     };

// module.exports = {
//   initDb,
//   getDataBase
// };