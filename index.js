const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');
const { command } = require('../pc-commands/commands/echo');

module.exports = class Linkshortner extends Plugin {
    startPlugin () {
        powercord.api.commands.registerCommand({
            command: "tnyurl",
            aliases: [ "url"],
            description: "Lets you shrink urls using tnyurl",
            usage: "{c}tnyurl <url>",
            executor: this.linkshortneris.bind(this)
        });
    }
    pluginWillUnload() {
        powercord.pluginWillUnload('Linkshortner')
    }
    async linkshortneris(args) {
        const data = await get("http://tinyurl.com/api-create.php?url="+args[0]);
        return {
            send: true,
            result: `${data.body}`
        };
    }
};
