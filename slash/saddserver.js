const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const db = require('quick.db');
const Gamedig = require('gamedig');

module.exports = {
    data: {
        slash: new SlashCommandBuilder()
            .setName('addserver')
            .addStringOption(option =>
                option.setName('serverip')
                    .setDescription(`The IP of the server to add`)
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('servergame')
                    .setDescription(`The game of the server to add`)
                    .setRequired(true))

            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription(`The channel to send the message to`)
                    .setRequired(true))

            .addStringOption(option =>
                option.setName('serverport')
                    .setDescription(`The port of the server to add`)
                    .setRequired(false))
            .setDescription('adds a server to be tracked by the bot'),
        type: [],
        name: "addserver"
    },
    async execute(interaction, client) {
        //get all the options
        const serverip = interaction.options.getString('serverip');
        const servergame = interaction.options.getString('servergame');
        const serverport = interaction.options.getString('serverport');
        const channel = interaction.options.getChannel('channel');

        const guildID = interaction.guildId;
        //make a random UUID
        const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        console.log(serverip);
        console.log(servergame);
        console.log(serverport);
        console.log(channel);

        //now we add it!
        if (!db.has("data")) db.set("data", {});
        if (!db.has('data.discordServers')) db.set('data.discordServers', {});
        if (!db.has(`data.discordServers.${guildID}`)) db.set(`data.discordServers.${guildID}`,{
            servers: []
        })

        dataOut = {}
        dataOut.serverip = serverip;
        dataOut.servergame = servergame;
        if (serverport) dataOut.serverport = serverport;
        dataOut.channel = channel.id;
        dataOut.uuid = uuid;
        console.log(dataOut);
        db.push(`data.discordServers.${guildID}.servers`, dataOut)

        interaction.editReply({ content: "Added server! Let me check if it works...", ephemeral: true });
        Gamedig.query({
            type: servergame,
            host: serverip,
            port: serverport
        }).then(state => {
            console.log(state);
            interaction.editReply({ content: "Server is online! I'll add it to the list!", ephemeral: true });
        }).catch(error => {
            interaction.editReply({ content: "An error has occurred. Maybe the server is offine? It was still added to the list.", ephemeral: true });
        });
    },
};