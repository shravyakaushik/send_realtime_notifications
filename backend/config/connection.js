const { Sequelize } = require('sequelize');

// Replace these with your actual database credentials
const sequelize = new Sequelize('my_database', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Set to true if you want to see SQL queries in console
});

module.exports = sequelize;
