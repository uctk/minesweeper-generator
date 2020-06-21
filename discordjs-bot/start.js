const Discord = require("discord.js");

const Logger = require("../utils/logger");

const CommandsManager = require("../utils/CommandsManager");
const botConfig = require("./config.json");
const botPrivateConfig = require("./private-config.json");

//

Logger.setupLogger();

//

var bot = new Discord.Client();

var cmdManager = new CommandsManager();
    cmdManager.cmdPrefix = "!";

bot.on("ready", () => {

});

bot.on("message", () => {
    cmdManager.registerCommand("mw", {
        onCommand: (msg, channel, user, label, args) => {

        },
        onlyOn: botConfig.bot.commands.mw.onlyOn
    });
});

bot.login(botPrivateConfig.bot.token);