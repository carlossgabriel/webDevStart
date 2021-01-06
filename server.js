// Definir express para setar o servidor
const express = require("express")
const server = express()
const db = require("./db")

// Definir array das ideias
// const ideas = [{
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         categoria: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicinig elit. Optio, fugit fuga obcaecati voluptas enim inventore laboriosam itaque quia?",
//         url: "https://google.com"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
//         title: "Jogos",
//         categoria: "Lazer",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicinig elit. Optio, fugit fuga obcaecati voluptas enim inventore laboriosam itaque quia?",
//         url: "https://google.com"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         categoria: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicinig elit. Optio, fugit fuga obcaecati voluptas enim inventore laboriosam itaque quia?",
//         url: "https://google.com"
//     },
//     {
//         img: "https://www.flaticon.com/svg/static/icons/svg/257/257864.svg",
//         title: "Curso de Edição",
//         categoria: "Edição",
//         description: "Lorem ipsum dolor sit amet consectetur, adipisicinig elit. Optio, fugit fuga obcaecati voluptas enim inventore laboriosam itaque quia?",
//         url: "https://google.com"
//     }
// ]

// Configurar arquivos estativos (css,scripts, imgs)
// Define a pasta "public" como pasta comum e permite o uso
server.use(express.static("public"))

// Configuração do express para a habilitar o request. body
server.use(express.urlencoded({ extended: true }))

// Configuracao nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

// Organizacao do GET, criando uma ROTA 
// Captura o pedido do cliente para responder 
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err){
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS")
        }
        const reversedIdeas = [...rows].reverse()
        let lastIdeas = []
        for (idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea) //ad to idea array
            }
        }
        return res.render("index.html", {
            ideas: lastIdeas
        })
    })

})

server.get("/ideias", function (req, res) {
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err){
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS")
        }
        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", {ideas: reversedIdeas})
})
})

// Configurando o POST, que será responsável por enviar os dados cadastrados para a aplicação 
server.post("/", function (req, res) {
    //Inserir    
    const query = `
            INSERT INTO ideas(
                image,
                title,
                category,
                description,
                link
            ) VALUES (?, ?, ?, ?, ?);
        `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]
    db.run(query, values, function (err) {
        if (err){
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS")
        }
        return res.redirect("/ideias")
    })
    console.log(req.body);
})
// Conexao do servidor na porta
server.listen(5000)