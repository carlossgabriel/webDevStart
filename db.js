const {
    Database
} = require("sqlite3");

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function () {
//     //Criação
//     db.run(`
//         CREATE TABLE IF NOT EXISTS ideas(
//             id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//             image TEXT,
//             title TEXT,
//             category TEXT,
//             description TEXT,
//             link TEXT
//         );
//     `)
//     Inserir    
//     const query = `
//     INSERT INTO ideas (
//         image,
//         title,
//         category,
//         description,
//         link
//     ) VALUES (?,?,?,?,?)
// `
    
//     const values = [
//         "https://image.flaticon.com/icons/svg/2729/2729021.svg",
//         "Zerar um Jogo",
//         "Lazer",
//         "Lorem ipsum dolor sit amet consectetur, adipisicinig elit. Optio, fugit fuga obcaecati voluptas enim inventore laboriosam itaque quia?",
//         "https://store.steampowered.com/"
//         ]
//     db.run(query, values, function (err) {
//         if(err) return console.log(err)
//         console.log(this);
//     })

    // Consultar
    // db.all(`SELECT * FROM ideas`, function(err, rows){
    //     if(err) return console.log(err);
    //     console.log(rows, this);
    // })


    // Deletar
    // db.run(`DELETE FROM ideas WHERE ideas.id = ?`, [8], function(err){
    //     if(err) return console.log(err);
    //     console.log("LINHA DELETADA",this); 
    // })

    // Alterar
    // db.run(`UPDATE FROM ideas WHERE`)
})

module.exports = db