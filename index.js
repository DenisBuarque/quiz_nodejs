/*
Lib Install: Express, EJS, Nodemon, Body-parser

Para trabalhar com mysql no node js:
npm install --save sequelize
npm install --save mysql2
 */
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
//conexão mysql
const connection = require('./database/database');
//importa o Model
const perguntaModel = require('./database/Models/Pergunta');
const respostaModel = require('./database/Models/Resposta');

connection
    .authenticate()
    .then(()=>{
        console.log('conexão realizada com sucesso!');
    }).catch((err)=>{
        console.log('Erro de conexão com o banco' + err);
    });

// EJS e ultilizado para renderizar o HTML
// deve criar uma pasta views e colocar os arquivos com extenção .ejs
app.set('view engine','ejs');

//Body parser - recebe os dado do formulario
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// diretorio onde fica os arquivos staticos: imagens, css...
app.use(express.static('public'));

// Rota página principial
app.get('/', function(req, res){
    // listando dados da tabela
    perguntaModel.findAll({ raw: true, order: [
        ['id','DESC']
    ] }).then((perguntas) => {
        res.render('index',{
            perguntas: perguntas
        }); //esta em: views/index.ejs
    });
});
// rota página de perguntas
app.get('/pergunta', function(req, res){
    res.render('pergunta'); //esta em: views/pergunta.ejs
});

app.get('/detalhe/:id', function(req, res){
    var id = req.params.id;
    perguntaModel.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if(pergunta != undefined)
        {
            //pega o relacionamento com a perguntas
            respostaModel.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then((respostas) => {
                // envia os dados para página
                res.render('detalhe',{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });

        } else {
            res.redirect('/');
        }
    });
    
});

// rota do formulario para salvar as perguntas
app.post('/salvar', function(req, res){
    var title = req.body.title;
    var description = req.body.description;

    perguntaModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/');
    });    
});

// rota do formulario para salvar as respostas
app.post('/salvarReposta', function(req, res){
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    respostaModel.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/detalhe/' + perguntaId);
    });    
});


// inicia o servidor node js
app.listen(3000, function(erro){
    if(erro){
        console.log('Ocorreu um erro ao iniciar o servidor!');
    } else {
        console.log('Servidor iniciado...');
    }
});