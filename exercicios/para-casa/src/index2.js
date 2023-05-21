//Requisições necessárias:

const express = require('express') //chama o express
const filmesJson = require ('./model/ghiblifilmes.json') //acessando o JSON  de filmes
const app = express() //execução do express

app.use(express.json()) //fazendo o body parse. traduzindo o código para JSON.

//Minha porta:

app.listen(1313, ()=>{
    console.log('O servidor está na porta 1313.')

})

//Minha rota padrão/principal:
app.get("/",(request, response) => {
    response.status(200).json(
        [{
            "Mensagem": "Isso aí! API de filmes ON Roteando"
    }])
})

//Minha rota de filmes

app.get("/ghiblifilmes", (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rotas Filme por ID, Título e Diretor

//Minha rota de filmes por ID

app.get("/filmesJson/:id", (request, response) => {
    let idRequest = request.params.id //eu quero encontrar filme por id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

//Minha rota de filmes por TÍTULO

app.get("/title", (request,response) => {
    let titleRequest = request.query.title.toLocaleLowerCase() //eu quero encontrar filme por título
    console.log(titleRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest)) //computador, filtra os anos e me dá somente o que eu pedir
    response.status(200).send(filmeEncontrado)
})

// Minha rota de filmes por DIRETOR

app.get("/director", (request,response) => {
    let directorRequest = request.query.director.toLocaleLowerCase() //eu quero encontrar filme por diretor
    console.log(directorRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(directorRequest))
    response.status(200).send(filmeEncontrado)
})

//Minha rota pra post

app.post("/filmesJson", (request, response) => {
    let titleRequest = request.body.title 
    let original_titleRequest = request.body.original_title
    let original_title_romanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let producerRequest =  request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timeRequest = request.body.running_time 

    let novoFilme = {
        id: (filmesJson.length)+1,
        title: titleRequest,
        original_title: original_titleRequest,
        original_title_romanised: original_title_romanisedRequest,
        description: descriptionRequest,
        director: directorRequest,
        producer: producerRequest,
        release_date: release_dateRequest,
        running_time: running_timeRequest,
        
    }
    
    filmesJson.push(novoFilme)
    response.status(201).json([{
        "Mensagem":"Seu filme foi cadastrado com sucesso!",
        novoFilme

    }])

})