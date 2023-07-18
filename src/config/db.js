const sequelize = require('sequelize');

// const database = new sequelize('ClubBosch', 'ClubBosch', 'guiluis31415',
const database = new sequelize('ClubeBosch', 'ClubeBosch', 'guiluis31415',
{
    // dialect: 'mssql', host:'localhost', port: 57509
    dialect: 'mssql', host:'localhost', port: 61016
});

database.sync();

module.exports = database;