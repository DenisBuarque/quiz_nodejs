const Sequelize = require('sequelize');
const connection = require('../database');

const Pergunta = connection.define('perguntas',{
    title: {
        type: Sequelize.STRING, // define texto curto
        allowNull: false // preenchimento do campo obrigatório
    },
    description: {
        type: Sequelize.TEXT, // define um testo longo
        allowNull: false // preenchimento do campo obrigatório
    }
});
// cria a tabela no banco se não existir
Pergunta.sync({force: false}).then(() => {
    console.log('Tabela pergunta criada');
});

module.exports = Pergunta;