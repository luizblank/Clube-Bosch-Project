const Sequelize = require('sequelize');
const database = require('../config/db');
const colaboradores = require('../model/colaboradores');

const reservas = database.define('Reservas',{
    IDReserva: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    NomeEspaco: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    Tipo: {
        type: Sequelize.STRING(20),
        allowNull: false
    },

    Data: {
        type: Sequelize.STRING(10),
        allowNull: false
    },

    HoraInicio: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    
    HoraFim: {
        type: Sequelize.STRING(5),
        allowNull: false
    }
});

reservas.belongsTo(colaboradores, {
    constraint: true,
    foreignKey: 'IDColaborador'
});

module.exports = reservas;