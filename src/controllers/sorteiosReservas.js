const colaboradores = require('../model/colaboradores');
const sorteios = require('../model/sorteios');
const reservas = require('../model/reservas');

module.exports = {
    async pagSorteiosPost(req, res){
        const dados = req.body;
        const session = req.session;

        console.log(req.body);
        
        if(!dados.data || !dados.churrasqueira){
            if(session.ADM == 1){
                res.redirect('/pagInicialAdm');
                return;
            }

            res.redirect('/pagInicial', {});
            return;
        }
        
        var dataFormat = dados.data.split("-");
        var ano = dataFormat[0];
        var mes = dataFormat[1];
        var dia = dataFormat[2];
        var results = dia + "/" + mes + "/" + ano;

        await sorteios.create({
            IDColaborador : session.IDColaborador,
            NomeEspaco: dados.churrasqueira,
            Tipo: 'Churrasqueira',
            Data: results,
            HoraInicio: "8:00",
            HoraFim: "00:00"
        });

        res.redirect('/pagInicialAdm');
    },

    async pagReservasPost(req, res){
        const dados = req.body;
        const session = req.session;

        if(!dados.data || !dados.esportes || !dados.hora){
            if(session.ADM == 1){
                res.redirect('/pagInicialAdm');
                return;
            }

            res.redirect('/pagInicial');
            return;
        }

        //////////////////////////////////////////////////////////////////
        // Controle de Horario reservas Esportes
        const horaFront = req.body.hora;
        const esporteFront = req.body.esportes;
        const dataFront = req.body.data;

        var dataFormat = dataFront.split("-");
        var ano = dataFormat[0];
        var mes = dataFormat[1];
        var dia = dataFormat[2];
        var results = dia + "/" + mes + "/" + ano;

        const esporte = await reservas.findAll({
            raw: true,
            attributes: ['Tipo', 'NomeEspaco', 'HoraInicio', 'Data'],
            where: {Tipo: 'Esporte', NomeEspaco: esporteFront, HoraInicio: horaFront, Data: results}
        });

        console.log(esporte);

        if(esporte.length > 0)
        {
            const dadosReservas = await reservas.findAll({
                raw: true,
            });
            
            var dateToday = new Date();
            dateToday = dateToday.toISOString().split('T')[0];

            if(req.body.TipoColaborador == "ADM")
            {
                res.render('../views/paginaInicialADM', {NomeColaborador: req.session.Nome, dadosReservas, dateToday, erro: true});
                return;
            }
            
            res.render('../views/paginaInicial', {NomeColaborador: req.session.Nome, dadosReservas, dateToday, erro: true});
            return;
        }

        //////////////////////////////////////////////////////////////////
        
        var horasep = dados.hora.split(":");
        horasep[0] = (parseInt(horasep[0]) + 1).toString();
        var horafim = horasep[0] + ":" + horasep[1];

        var dataFormat = dados.data.split("-");
        var ano = dataFormat[0];
        var mes = dataFormat[1];
        var dia = dataFormat[2];
        var results = dia + "/" + mes + "/" + ano;
    
        await reservas.create({
            IDColaborador : session.IDColaborador,
            NomeEspaco: dados.esportes,
            Tipo: 'Esporte',
            Data: results,
            HoraInicio: dados.hora,
            HoraFim: horafim
        });

        res.redirect('/pagInicialAdm');
    },

}