const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log(interaction);
        await interaction.reply("Thinking...")
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (interaction.isSelectMenu()) {
            //Menus
            console.log("Menu selected!");
            return;
        }

        if (interaction.isButton()) {
            //Buttons
            console.log("Button Pressed!")
            const command = client.commands_slash.get(interaction.message.interaction.commandName);
            
            try {
                await command.button(interaction, client, interaction.button);
            } catch (error) {
                console.log(error);
                await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

            return;
        }

        if (interaction.isCommand()) {
            //Commands
            console.log("Command!")
            const command = client.commands_slash.get(interaction.commandName);
            if (!command) return;

            const perms = command.data.permissions;
            //check if the user has all the permissions in the perms arra

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};