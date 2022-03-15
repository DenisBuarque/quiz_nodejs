const Sequelize = require('sequelize');

const connection = new Sequelize('nodejs_quiz','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;