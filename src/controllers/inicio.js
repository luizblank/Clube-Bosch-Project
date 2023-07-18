const colaboradores = require('../model/colaboradores');
const sorteios = require('../model/sorteios');
const reservas = require('../model/reservas');

module.exports = {
    async pagInicialGet(req, res){
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

        res.render('../views/paginainicial', {NomeColaborador, dadosReservas, dateToday, erro : false, verifyEsportes, verifyChurrasqueira1, verifyChurrasqueira2});
    },
}