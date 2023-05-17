//Requisições necessárias:

const express = require('express') //chama o express
const filmesJson = require('./model/filmes.json') //acessando o JSON  de filmes
const app = express() //execução do express

app.use(express.json()) //fazendo o body parse. traduzindo o código para JSON.

//Minha porta:

app.listen(8080, ()=>{
    console.log('o servidor está na porta 8080, Garota')

})

//Minha rota padrão/principal:
app.get('/',(request, response)=>{
    response.status(200).json(
        [{
            'mensage': 'deu certo, garota! API de filmes ON Roteando'
    }])
})

//Minha rota de filmes

app.get("/filmes",(request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rota Filme por ano
app.get("/filmes/ano",(request,response)=>{
    let anoRequest = request.query.ano //eu quero encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //computador, filtra os anos e me dá somente o que eu pedir
    response.status(200).send(filmeEncontrado)
})

//Minha rota pra post

app.post("/filmes", (request, response) => { //eu quero add um filme, ele tem: 
    let generoRequest = request.body.genero //gênero
    let anoRequest = request.body.ano // ano
    let títuloRequest = request.body.título // título
    let resumoRequest = request.body.resumo // resumo

    let novoFilme = {
        id: (filmesJson.length)+1,
        genero: generoRequest,
        ano: anoRequest,
        título: títuloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        "Mensagem":"Seu filme foi cadastrado com sucesso!",
        novoFilme

    }])

})

app.get("/filmes/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/título", (request, response) => {
    let títuloRequest = request.query.título.toLocaleLowerCase()
    console.log(títuloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.título.toLocaleLowerCase().includes(títuloRequest))
    response.status(200).send(filmeEncontrado)

} )

/* app.get("/filmes/titulo", (request, response) => { // eu quero o titulo
    let tituloRequest = request.query.titulo.toLocaleLowerCase() // meu parametro é o titulo, me manda mesmo com letras maisculas
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter( // filtrou? então manda ai
        filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest) //includes: ele percorre o array e se encontrar o titulo ele de
                                                                         // devolve - pq ele esta procurando "o que inclui"
    )
    response.status(200).send(filmeEncontrado)// devolve quando o filme é cadastrado 

}); */