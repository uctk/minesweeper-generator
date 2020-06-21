console.default = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
}

class Logger {
    static log(...args) {
        console.default.log(Logger.getLogPrefix(Logger.logPrefixPattern, "LOG"), ...args);
    }
    static info(...args) {
        console.default.log(Logger.getLogPrefix(Logger.logPrefixPattern, "INFO"), ...args);
    }
    static warn(...args) {
        console.default.log(Logger.getLogPrefix(Logger.logPrefixPattern, "WARN"), ...args);
    }
    static error(...args) {
        console.default.log(Logger.getLogPrefix(Logger.logPrefixPattern, "ERROR"), ...args);
    }

    //

    static logPrefixPattern = "[{dd}/{MM}/{YY} {hh}:{mm}:{ss}.{ms} - {logtype}]";

    static getDatePrefix(pattern) {
        var date = new Date();

        var year = ""+date.getFullYear();
        var month = ""+date.getMonth()+1;
            month = month.length < 2 ? "0"+month : month;
        var day = ""+date.getDate();
            day = day.length < 2 ? "0"+day : day;
        var hours = ""+date.getHours();
            hours = hours.length < 2 ? "0"+hours : hours;
        var minutes = ""+date.getMinutes();
            minutes = minutes.length < 2 ? "0"+minutes : minutes;
        var seconds = ""+date.getSeconds();
            seconds = seconds.length < 2 ? "0"+seconds : seconds;
        var miliseconds = ""+date.getMilliseconds();
            miliseconds = miliseconds.length < 3 ? ("0"+miliseconds).length < 3 ? ("00"+miliseconds) : ("0"+miliseconds) : miliseconds;


        var prefix = pattern;
            prefix = prefix.replace(/{YY}|%YY%|{year}|%year%/g, year);
            prefix = prefix.replace(/{MM}|%MM%|{month}|%month%/g, month);
            prefix = prefix.replace(/{dd}|%dd%|{day}|%day%/g, day);
            prefix = prefix.replace(/{hh}|%hh%|{hours}|%hours%/g, hours);
            prefix = prefix.replace(/{mm}|%mm%|{minutes}|%minutes%/g, minutes);
            prefix = prefix.replace(/{ss}|%ss%|{seconds}|%seconds%/g, seconds);
            prefix = prefix.replace(/{ms}|%ms%|{miliseconds}|%miliseconds%/g, miliseconds);

        return prefix;
    }

    static getLogPrefix(pattern, logtype) {
        var prefix = Logger.getDatePrefix(pattern);
            prefix = prefix.replace(/{logtype}|%logtype%/g, logtype);

        return prefix;
    }

    //

    static setupLogger(logPrefixPattern) {
        if(typeof logPrefixPattern == "string") {
            Logger.logPrefixPattern = logPrefixPattern;
        }

        console.log = Logger.log;
        console.info = Logger.info;
        console.warn = Logger.warn;
        console.error = Logger.error;
    }
};

module.exports = Logger;