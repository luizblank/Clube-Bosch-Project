const colaboradores = require('../model/colaboradores');
const reservas = require('../model/reservas');

var invalidlogin = 0;

module.exports = {
    async pagCadastroGet(req, res){
        if(req.session.ADM == 0){
            res.redirect('/pagInicial');
            return
        }

        if(!req.session.EDV){
            res.redirect('/pagLogin');
            return
        }
        
        res.render('../views/cadastro');
    },

    async pagCadastroPost(req, res){
        const dados = req.body;
        var admvalue = 0;

        if(dados.adm == 'sim'){
            admvalue = 1;
        }
        
        await colaboradores.create({
            EDV: dados.edv,
            Nome: dados.nome,
            Email: dados.email.toLowerCase(),
            Secao: dados.secao.toLowerCase(),
            ADM: admvalue  
        });

        res.redirect('/pagInicialAdm');
    },

    async pagLoginGet(req, res){
        session = req.session;
        if(session.ADM == 1){
            res.redirect('/pagInicialAdm');
            return;
        }

        if(session.EDV){
            res.redirect('/pagInicial');
            return;
        }

        res.render('../views/login', {invalidlogin});
    },

    async pagLoginPost(req, res){
        invalidlogin = 0;

        const dados = req.body;
        const colaborador = await colaboradores.findAll({
            raw: true, 
            attributes: ['IDColaborador', 'EDV', 'Nome', 'Secao', 'ADM'],
            where: { EDV: dados.edv, Secao: dados.secao.toLowerCase()}
        });
        
        session = req.session;

        if(colaborador.length >= 1) {
            if(colaborador[0].ADM == 1){
                session.IDColaborador = colaborador[0].IDColaborador;
                session.EDV = colaborador[0].EDV;
                session.Nome = colaborador[0].Nome;
                session.Secao = colaborador[0].Secao;
                session.ADM = colaborador[0].ADM;
                console.log(session);
                res.redirect('/pagInicialAdm');
                return
            }

            console.log(session);
            session.IDColaborador = colaborador[0].IDColaborador;
            session.EDV = colaborador[0].EDV;
            session.Nome = colaborador[0].Nome;
            session.Secao = colaborador[0].Secao;
            session.ADM = colaborador[0].ADM;
            res.redirect('/pagInicial');
            return
        }

        invalidlogin = 1;

        res.redirect('/pagLogin');
    },

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}