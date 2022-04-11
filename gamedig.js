const Gamedig = require('gamedig');
Gamedig.query({
    type: 'minecraft',
    host: 'purpleprison.org'
}).then((state) => {
    console.log(state);
}).catch((error) => {
    console.log("Server is offline");
});