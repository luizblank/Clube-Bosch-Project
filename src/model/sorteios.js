const Sequelize = require('sequelize');
const database = require('../config/db');
const colaboradores = require('../model/colaboradores');

const sorteios = database.define('Sorteios',{
    IDSorteio: {
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

sorteios.belongsTo(colaboradores, {
    constraint: true,
    foreignKey: 'IDColaborador'
});

module.exports = sorteios;