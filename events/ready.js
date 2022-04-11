const update = require('../update.js')

module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        const {status} = require("../config.json");
        update.execute(client);
    },
};

