// Iniciando Route do Express
const express = require('express');
const route = express.Router();

// Iniciando Multer
const multer = require("multer");

// Recebendo arquivo do multer
const config1 = require('./src/config/multer1');
const config2 = require('./src/config/multer2');
const config3 = require('./src/config/multer3');

// Importando os Controllers
const home = require('./src/controllers/home');
const inicio = require('./src/controllers/inicio');
const cadlog = require('./src/controllers/cadlog');
const adm = require('./src/controllers/adm');
const reservas = require('./src/controllers/sorteiosReservas');

// Iniciando as rotas
route
    .get('/', home.PagIndexGet)

    .get('/pagInicial', inicio.pagInicialGet)

    .get('/pagLogin', cadlog.pagLoginGet)
        .post('/pagLoginPost', cadlog.pagLoginPost)

    .get('/Logout', cadlog.logout)

    .get('/pagCadastro', cadlog.pagCadastroGet)
        .post('/pagCadastroPost', cadlog.pagCadastroPost)

    .get('/pagInicialAdm', adm.InicioAdmGet)
        .post('/pagRegSorteioPost', reservas.pagSorteiosPost)
        .post('/pagRegReservaPost', reservas.pagReservasPost)
        .post('/uploadFoto1', multer(config1).single('foto1'), adm.ImgPost)
        .post('/uploadFoto2', multer(config2).single('foto2'), adm.ImgPost)
        .post('/uploadFoto3', multer(config3).single('foto3'), adm.ImgPost)
        
    .get('/pagConferirAdm', adm.ConferirAdmGet)
        .post('/apagarReserva/:id', adm.apagarReservaPost)
        .post('/paginaSorteio', adm.SorteioChurrasqueira)
        .post('/selectReserva', adm.selectReserva);
    
module.exports = route;