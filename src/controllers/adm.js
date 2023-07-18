const { where } = require('sequelize');
const colaboradores = require('../model/colaboradores');
const reservas = require('../model/reservas');
const sorteios = require('../model/sorteios');
const db = require('../config/db');

module.exports = {
    async InicioAdmGet(req, res){
        if(req.session.ADM == 0){
            res.redirect('/pagInicial');
            return
        }

        if(!req.session.EDV){
            res.redirect('/pagLogin');
            return
        }

        const dadosReservas = await reservas.findAll({
            raw: true,
        });

        const verifyEsportes = await reservas.findAll({
            raw: true,
            where: { IDColaborador : session.IDColaborador, Tipo : 'Esporte' }
        });
        
        const verifyChurrasqueira1 = await reservas.findAll({
            raw: true,
            where: { IDColaborador : session.IDColaborador, Tipo : 'Churrasqueira' }
        });

        const verifyChurrasqueira2 = await sorteios.findAll({
            raw: true,
            where: { IDColaborador : session.IDColaborador}
        });

        var dateToday = new Date();
        dateToday = dateToday.toISOString().split('T')[0];

        var NomeColaborador = req.session.Nome.split(" ")[0];

        res.render('../views/paginaInicialADM', {NomeColaborador, dadosReservas, dateToday, erro : false, verifyEsportes, verifyChurrasqueira1, verifyChurrasqueira2});
    },

    async ConferirAdmGet(req, res){
        
        if(req.session.ADM == 0){
            res.redirect('/pagInicial');
            return;
        }

        if(!req.session.EDV){
            res.redirect('/pagLogin');
            return;
        }

        // -----------------------PARTE DAS DATAS---------------------------

        const datas = await reservas.findAll({
            raw: true
        });

        var dateToday = new Date();
        dateToday = parseInt(dateToday.toISOString().split('T')[0].split('-')[2]);

        for (let i = 0; i < datas.length; i++) {
            var dataPassada = datas[i].Data.split("/");
            dataPassada = parseInt(dataPassada[0]);

            if(dateToday > dataPassada){
                await reservas.destroy({
                    where: { Data: datas[i].Data }
                });
            }
        }

        // -----------------------PARTE DAS TABELAS---------------------------

        const dadosColaboradores = await colaboradores.findAll({
            raw: true,
            attributes: ['IDColaborador', 'Nome', 'EDV', 'Email'],
        });


        const dadosReservas = await reservas.findAll({
            raw: true,
        });

        // -----------------------PARTE DOS SORTEIOS---------------------------
        const Passauna = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio', 'IDColaborador'],
            where: {NomeEspaco: 'Passaúna'}
        });

        const Barigui = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Barigui'}
        });

        const JardimBotanico = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Jardim Botânico'}
        });

        const Tangua = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Tanguá'}
        });

        const OperaDeArame = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Ópera de Arame'}
        });

        const Tingui = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Tingui'}
        });

        const MemorialUcraniano = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Memorial Ucraniano'}
        });

        const MuseuDoOlho = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Museu do Olho'}
        });

        var datasList = [];
        var dataHoje = new Date();

        datas.forEach(item => {
            var data = item.createdAt.toISOString();
            data = new Date(data).getTime() + 60000;
            data = new Date(data);
            datasList.push(data);
        });

        res.render('../views/conferisADM', {dadosColaboradores, dadosReservas, Passauna, Barigui, JardimBotanico, Tangua, OperaDeArame, Tingui, MemorialUcraniano, MuseuDoOlho, dataHoje, datasList});
    },

    async apagarReservaPost (req, res) {
        const id = req.params.id;

        await reservas.destroy({
            where: { IDReserva: id }
        });

        res.redirect('/pagConferirAdm');
    },

    async ImgPost(req, res){
        res.redirect('/pagInicialAdm');
    },

    async SorteioChurrasqueira(req, res){
        dados = req.body;

        const ChurrasqueiraSorteada = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: dados.Churrasqueira}
        });

        var numeroSorteado = Math.floor(Math.random() * ChurrasqueiraSorteada.length + 1);
        
        numeroSorteado = ChurrasqueiraSorteada[numeroSorteado - 1].IDSorteio;

        const dadosGanhador = await sorteios.findOne({
            raw: true,
            where: {IDSorteio : numeroSorteado}
        });

        await reservas.create({
            NomeEspaco: dadosGanhador.NomeEspaco,
            Tipo: dadosGanhador.Tipo,
            Data: dadosGanhador.Data,
            HoraInicio: dadosGanhador.HoraInicio,
            HoraFim: dadosGanhador.HoraFim,
            IDColaborador: dadosGanhador.IDColaborador
        });

        await db.query(`DELETE FROM [Sorteios] WHERE [NomeEspaco] = '${dados.Churrasqueira}'`);

        res.redirect('/pagConferirAdm');
    },

    async selectReserva(req, res){
        dados = req.body;

        // -----------------------PARTE DAS DATAS---------------------------

        const datas = await reservas.findAll({
            raw: true
        });

        var dateToday = new Date();
        dateToday = parseInt(dateToday.toISOString().split('T')[0].split('-')[2]);

        for (let i = 0; i < datas.length; i++) {
            var dataPassada = datas[i].Data.split("/");
            dataPassada = parseInt(dataPassada[0]);

            if(dateToday > dataPassada){
                await reservas.destroy({
                    where: { Data: datas[i].Data }
                });
            }
        }

        // -----------------------PARTE DAS TABELAS---------------------------

        const dadosColaboradores = await colaboradores.findAll({
            raw: true,
            attributes: ['IDColaborador', 'Nome', 'EDV', 'Email'],
        });


        const dadosReservas = await reservas.findAll({
            raw: true,
            where: { Tipo : dados.Reserva}
        });

        // -----------------------PARTE DOS SORTEIOS---------------------------
        const Passauna = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio', 'IDColaborador'],
            where: {NomeEspaco: 'Passaúna'}
        });

        const Barigui = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Barigui'}
        });

        const JardimBotanico = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Jardim Botânico'}
        });

        const Tangua = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Tanguá'}
        });

        const OperaDeArame = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Ópera de Arame'}
        });

        const Tingui = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Tingui'}
        });

        const MemorialUcraniano = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Memorial Ucraniano'}
        });

        const MuseuDoOlho = await sorteios.findAll({
            raw: true,
            attributes: ['NomeEspaco', 'IDSorteio'],
            where: {NomeEspaco: 'Museu do Olho'}
        });

        var datasList = [];
        var dataHoje = new Date();

        datas.forEach(item => {
            var data = item.createdAt.toISOString();
            data = new Date(data).getTime() + 60000;
            data = new Date(data);
            datasList.push(data);
        });

        res.render('../views/conferisADM', {dadosColaboradores, dadosReservas, Passauna, Barigui, JardimBotanico, Tangua, OperaDeArame, Tingui, MemorialUcraniano, MuseuDoOlho, dataHoje, datasList});
    },
}