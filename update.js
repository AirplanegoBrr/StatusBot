const Discord = require('discord.js');
const Gamedig = require('gamedig');
const db = require('quick.db')

var running = false;

async function run(client) {
    running = true;
    if (!db.has('data')) db.set('data', {});
    if (!db.has('data.discordServers')) db.set('data.discordServers', {});

    const discordServers = db.get('data.discordServers');
    const discordServersKey = Object.keys(discordServers);
    for (const key of discordServersKey) {
        var servers = db.get(`data.discordServers.${key}.servers`);
        for (const server of servers) {
            const channel = client.channels.cache.get(server.channel);
            try {
                Gamedig.query({
                    type: server.servergame,
                    host: server.serverip,
                    port: server.serverport
                }).then(state => {
                    console.log(state);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${state.name}`)
                        .setColor(0x00AE86)
                        .addField('IP', `${state.connect}`)
                        .addField('Players', `${state.players.length}/${state.maxplayers}`, true)
                        .addField('Ping', `${state.ping}ms`, true)
                        .addField('UUID', `${server.uuid}`, true)
                        .setTimestamp();
                    if (channel) {
                        channel.send({ embeds: [embed]});
                    }
                }).catch(err => {
                    console.log(err);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`ERROR`)
                        .setColor(0xAE2F00)
                        .addField('IP', `${server.serverip}`, true)
                        .addField('Players', `ERROR/ERROR`, true)
                        .addField('Ping', `ERRORms`, true)
                        .addField('UUID', `${server.uuid}`, true)
                        .setTimestamp();
                    if (channel) {
                        channel.send({ embeds: [embed]});
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
    running = false;
}

async function execute(client) {
    run(client)
    setInterval(()=>{
        if (!running) {
            run(client)
        }
    }, 60 * 1000)
}

module.exports = {
    execute
}