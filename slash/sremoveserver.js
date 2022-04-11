const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const db = require('quick.db');
//removeserver
module.exports = {
    data: {
        slash: new SlashCommandBuilder()
            .setName('removeserver')
            .setDescription('Remove a server from the bot')
            .addStringOption(option =>
                option.setName('uuid')
                    .setDescription(`The UUID of the server to remove`)
                    .setRequired(true)),
        type: [],
        name: "removeserver"
    },
    async execute(interaction, client) {
        const uuid = interaction.options.getString('uuid');
        const guildID = interaction.guildId;
        const servers = db.get(`data.discordServers.${guildID}.servers`);
        const server = servers.find(server => server.uuid === uuid);
        if (!server) return interaction.editReply('Server not found');
        servers.splice(servers.indexOf(server), 1);
        db.set(`data.discordServers.${guildID}.servers`, servers);
        interaction.editReply({ content: "Server ``"+uuid+"`` removed", ephemeral: true });
    }
}
