// Importando Multer
const multer = require('multer');

// Configuração de armazenamento
const multerConfig = multer.diskStorage({

    // Criar destino de armazenamento
    destination: (req, file, cb) => {
        cb(null, 'public/img'); // (Caso de erro, Local de destino)
    },

    // Renomear arquivo
    filename: (req, file, cb) => {

        const fileName = 'foto2.png';

        // Alterando efetivamente o nome
        cb(null, fileName); // cb = CallBack
    }
});

// Exportando configurações
module.exports = { storage:multerConfig };