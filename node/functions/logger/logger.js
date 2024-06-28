const winston = require('winston');
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

/**
 * Available Loggers
 * @enum {string}
 */
const loggerTypes = {
	default: 'default',
};

// The default system logger
winston.loggers.add(loggerTypes.default, {
	level: 'debug',
	format: combine(
		errors({ stack: true }),
		timestamp(),
		json()
		// prettyPrint() // uncomment if you want beautiful logs
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: `.logs/all.log`, level: 'error' }),
		new winston.transports.File({ filename: `.logs/${loggerTypes.default}.log`, level: 'debug' }),
	],
	defaultMeta: { service: loggerTypes.default },
});

module.exports.loggerTypes = loggerTypes;
