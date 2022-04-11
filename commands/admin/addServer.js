module.exports = {
    name: 'addserver',
    description: 'Add a server to the bot',
    long_description: 'Add a server to the bot',
    permissions: ["MANAGE_CHANNELS"],
    args: ["number"],
    usage: 'addServer <server ip> (server port) <game>',
    type: 'admin',
    execute(client, Discord, message, guild) {
        const memberPermissions = message.member.permissions.toArray();
        if (!memberPermissions.includes("MANAGE_CHANNELS") || !message.author.id == "250029754076495874") {
            message.channel.send("No perm");
        };
        var y = message.content.split(" ").slice(1);
        console.log(y)
        //if args > 2
        if (y.length < 2) {
            message.channel.send("Please enter a server ip and a game");
        } else {
            
        }
    }
}