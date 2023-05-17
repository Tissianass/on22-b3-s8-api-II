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
app.get('/',(request, response)=>{
    response.status(200).json(
        [{
            'Mensagem': 'Isso aí! API de filmes ON Roteando'
    }])
})

//Minha rota de filmes

app.get("/ghiblifilmes", (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rotas Filme por Título, id e Diretor

app.get("/ghiblifilmes/title",(request,response)=>{
    let tituloRequest = request.query.title.toLocaleLowerCase() //eu quero encontrar filme por título
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(tituloRequest)) //computador, filtra os anos e me dá somente o que eu pedir
    response.status(200).send(filmeEncontrado)
})

app.get("/filmes/:id", (request, response) => {
    let idRequest = request.params.id //eu quero encontrar filme por id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/filmes/director",(request,response)=>{
    let diretorRequest = request.query.director.toLocaleLowerCase() //eu quero encontrar filme por diretor
    console.log(diretorRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(diretorRequest))
    response.status(200).send(filmeEncontrado)
})

//Minha rota pra post

app.post("/filmes", (request, response) => {
    let tituloRequest = request.body.title 
    let tituloOriginalRequest = request.body.original_title
    let tituloOriginalRomanizadoRequest = request.body.original_title_romanised
    let descricaoRequest = request.body.description
    let diretorRequest = request.body.director
    let produtorRequest =  request.body.producer
    let anoLancamentoRequest = request.body.release_date
    let tempoDeDuracaoRequest = request.body.running_time 

    let novoFilme = {
        id: (filmesJson.length)+1,
        titulo: tituloRequest,
        tituloOriginal: tituloOriginalRequest,
        tituloOriginalRomanizado: tituloOriginalRomanizadoRequest,
        descricao: descricaoRequest,
        diretor: diretorRequest,
        produtor: produtorRequest,
        anoLancamento: anoLancamentoRequest,
        tempoDeDuracao: tempoDeDuracaoRequest,
        
    }
    
    filmesJson.push(novoFilme)
    response.status(201).json([{
        "Mensagem":"Seu filme foi cadastrado com sucesso!",
        novoFilme

    }])

})

