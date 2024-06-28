const winston = require('winston');
const { loggerTypes } = require('../logger/logger');

const logger = winston.loggers.get(loggerTypes.default);

/**
 * Middleware to handle requests
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function handleRequest(req, res, next) {
	let allowed = false;
	try {
	} catch (error) {
		logger.error(`handleRequest() middleware error -> ${error?.toString()}`);
	} finally {
		if (allowed) {
			// send the response of the upstream server
		} else {
			// respond with a error message and status
		}
	}
}

module.exports = handleRequest;
