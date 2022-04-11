const fs = require('fs')
//read games.txt
let games = fs.readFileSync('./games.txt', 'utf8').split('\r\n');
console.log(games)

var gamesOut = {}

for (let i = 0; i < games.length; i++){
    let game = games[i].split('|')
    gamesOut[game[0]] = {}
    gamesOut[game[0]].name = game[1]
    gamesOut[game[0]].protocol = game[2]
    gamesOut[game[0]].options  = game[3]
    gamesOut[game[0]].extra = game[4]
}
console.log(gamesOut)
fs.writeFileSync('./games.json', JSON.stringify(gamesOut))