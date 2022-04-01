var fs = require('fs');
const path = require('path');
var winston = require("winston")
require('winston-daily-rotate-file');
var dateFormat = require('dateformat');
var dirLogPath = "./logs";
if (!fs.existsSync(dirLogPath)) {
    fs.mkdirSync(dirLogPath);
}

//TODO: Format logfile with own format at https://github.com/winstonjs/winston#formats https://medium.com/@davidmcintosh/winston-a-better-way-to-log-793ac19044c5
const formatLocalTimezone = () => dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss");
//https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/
//TODO: print line numnber https://stackoverflow.com/questions/11386492/accessing-line-number-in-v8-javascript-chrome-node-js
// https://stackoverflow.com/questions/14172455/get-name-and-line-of-calling-function-in-node-js

var fileLogFormat = winston.format.combine(
    // winston.format.colorize(),
    // winston.format.timestamp(),
    winston.format.align(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(
        info => `${formatLocalTimezone()} ${info.level} ${info.message}`
    )
);


var consoleLogFormat = winston.format.combine(
    winston.format.colorize(),
    // winston.format.timestamp(),
    winston.format.align(),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(
        info => `${formatLocalTimezone()} ${info.level} ${info.message}`
    )
);
var transportInfo = new winston.transports.DailyRotateFile({
    filename: dirLogPath + '/info.log',
    maxsize: '20m',
    maxFiles: '14d',
    json: false,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    level: 'debug',
    datePattern: 'YYYY-MM-DD',
    prepend: true
});
var transportError = new (winston.transports.File)({
    filename: dirLogPath + '/error.log',
    maxsize: 30000000,
    maxFiles: 10,
    json: false,
    handsleExceptions: true,
    humanReadableUnhandledException: true,
    level: 'error',
    prepend: true
});
var transportConsole = new (winston.transports.Console)({
    json: false,
    format: consoleLogFormat,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    colorize: true,
    level: 'debug'
});
var logger = winston.createLogger(
    {
        format: fileLogFormat,
        transports: [
            transportConsole,
            transportInfo,
            transportError,
        ],
        exitOnError: false,
    }
);
module.exports = function (mod) {
    var filename = mod.filename;
    var filename = path.relative(process.cwd(), mod.filename);
    return {
        info: function (msg, vars) {
            args = this.formatLogArguments(arguments)
            logger.info.apply(logger, args)
        },
        debug: function (msg, vars) {
            args = this.formatLogArguments(arguments)
            logger.debug.apply(logger, args)
        },
        warn: function (msg, vars) {
            args = this.formatLogArguments(arguments)
            logger.warn.apply(logger, args)
        },
        error: function (msg, vars) {
            args = this.formatLogArguments(arguments)
            logger.error.apply(logger, args)
        },
        formatLogArguments: function (args) {
            var newArgs = Array.prototype.slice.call(args);
            newArgs[0] = filename + ": " + args[0];
            return newArgs;
        }
    }
};