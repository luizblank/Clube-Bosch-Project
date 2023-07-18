const Sequelize = require('sequelize');
const database = require('../config/db');

const colaboradores = database.define('Colaboradores', {
    IDColaborador: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    EDV: {
        type: Sequelize.STRING(8),
        allowNull: false
    },

    Nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    Email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    Secao: {
        type: Sequelize.STRING(30),
        allowNull: false
    },

    ADM: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = colaboradores;