const Sequelize = require('sequelize');
const connection = require('../database');

const Resposta = connection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT, // definie um campo textolongo
        allowNull: false // campo é obrigatório ser preenchido
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// cria a tabela no banco se não existir
Resposta.sync({force: false}).then(() => {});

module.exports = Resposta;