const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const db = require('quick.db');

module.exports = {
	data: {
		slash: new SlashCommandBuilder()
			.setName('servers')
			.setDescription('Get the list of servers'),
		type: [],
		name: "servers"
	},
	async execute(interaction, client) {
        const guildID = interaction.guildId;
        if (!db.has("data")) db.set("data", {});
        if (!db.has('data.discordServers')) db.set('data.discordServers', {});
        if (!db.has(`data.discordServers.${guildID}`)) db.set(`data.discordServers.${guildID}`,{
            servers: []
        })
        var servers = db.get(`data.discordServers.${guildID}.servers`);
        console.log(servers)
        if (servers.length == 0) {
            const embed = new MessageEmbed()
                .setTitle("No servers found")
                .setDescription("You have no servers added to the bot")
                .setColor("#00ff00")
            interaction.editReply({ content: 'Here are your servers', ephemeral: true, embeds: [embed]});
        } else {
            //for every 25 servers make a new embed
            var embeds = [];
            var embed = new MessageEmbed()
                .setTitle("Servers")
                .setColor("#00ff00");
            for (var i = 0; i < servers.length; i++) {
                if (i % 25 == 0) {
                    embeds.push(embed);
                    embed = new MessageEmbed()
                        .setTitle("Servers")
                        .setColor("#00ff00");
                }
                embed.addField("IP: ``"+servers[i].serverip+"``", "UUID: ``"+servers[i].uuid+"`` Game: ``"+servers[i].servergame+"`` Channel <#"+servers[i].channel+">");
            }
            embeds.push(embed);
            interaction.editReply({ content: 'Here are your servers', ephemeral: true, embeds: embeds});
        }
	},
};