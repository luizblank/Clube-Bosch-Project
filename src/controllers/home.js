const colaboradores = require('../model/colaboradores');
const reservas = require('../model/reservas');

module.exports = {
    async PagIndexGet(req, res){
        const alameda = await colaboradores.findAll({
            raw: true,
            where: { Nome : 'alameda'}
        });

        if(alameda.length == 0)
        {
            await colaboradores.create({
                EDV: '87878777',
                Nome: 'alameda',
                Email: 'clubebosch@gmail.com',
                Secao: 'adm',
                ADM: 1
            });
        }

        res.render('../views/index');
    },
}