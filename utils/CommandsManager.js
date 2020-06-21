class CommandsManager {
    #cmdPrefix = ">";
    #commandsByLabel = {};
    constructor() {
    }

    set cmdPrefix(prefix) {
        this.#cmdPrefix = prefix;
    }

    get cmdPrefix() {
        return this.#cmdPrefix;
    }

    registerCommand(label, command) {
        if(command instanceof Object && !(command instanceof Array)) {
            this.#commandsByLabel[label] = command;
            return true;
        }
        else {
            return false;
        }
    }

    isCommand(cmdStr) {
        if(cmdStr.startsWith(this.#cmdPrefix)) {
            return true;
        }
        else {
            return false;
        }
    }

    execute(msg, channel, user, cmdStr) {
        var cmdInfo = parseCommand(this.#cmdPrefix, cmdStr);
        var cmd = this.#commandsByLabel[cmdInfo.label];
        if(cmd instanceof Object && !(cmd instanceof Array)) {
            var canExec = true;
            if(cmd.onlyOn instanceof Object && !(cmd.onlyOn instanceof Array)) {
                var onlyOn = cmd.onlyOn;
                if(onlyOn.channelsId instanceof Array) {
                    if(!onlyOn.channelsId.includes(channel.id)) {
                        canExec = false;
                    }
                }
            }

            if(canExec) {
                cmd.onCommand(msg, channel, user, cmdInfo.label, cmdInfo.args);
            }
        }
    }
}

function parseCommand(cmdPrefix, cmdStr) {
    var label = null;
    var args = [];

    if(cmdStr.endsWith(" ")) {
        cmdStr = cmdStr.substring(0, cmdStr.length-1);
    }

    if(cmdStr.startsWith(">")) {
        if(cmdStr.indexOf(" ") > -1) {
            label = cmdStr.substring(cmdPrefix.length, cmdStr.indexOf(" "));
        }
        else {
            label = cmdStr.substring(cmdPrefix.length, cmdStr.length);
        }
    }

    if(cmdStr.indexOf(" ") > -1) {
        var argsStr = cmdStr.substring(label.length+cmdPrefix.length+1, cmdStr.length);
        if(argsStr.indexOf(" ") > -1) {
            args = argsStr.split(" ");
        }
        else {
            args.push(argsStr);
        }
    }

    return {
        label: label,
        args: args
    }
}

module.exports = CommandsManager;