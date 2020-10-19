const morgan = require('morgan');
const path = require('path');
const winston = require('winston');
const { combine, cli } = winston.format;

morgan.token('BODY', req => {
  let body = req.body;
  if (body.password) {
    body = { ...body, password: '***' };
  }
  return JSON.stringify(body);
});
morgan.token('QUERY', req => JSON.stringify(req.query));

const files = {
  error: {
    level: 'error',
    filename: path.resolve(__dirname, '../../', 'logs', 'error.log'),
    json: true,
    maxFiles: 1,
    maxsize: 5242880
  },
  info: {
    level: 'info',
    filename: path.resolve(__dirname, '../../', 'logs', 'log.log'),
    json: true,
    maxFiles: 1,
    maxsize: 1024 * 5000,
    handleExceptions: true,
    colorize: false
  }
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.printf(info => {
      return `${info.timestamp} - ${info.message.split('\n')[0]}`;
    })
  ),
  transports: [
    new winston.transports.File(files.error),
    new winston.transports.File(files.info)
  ],
  exitOnError: true
});

logger.add(
  new winston.transports.Console({
    format: combine(cli())
  })
);

logger.stream = {
  write: message => logger.info(message)
};

const requestLogger = morgan(
  ':date[web] - METHOD::method - STATUS::status - :url - QUERY::QUERY - BODY::BODY - :response-time ms',
  {
    stream: logger.stream
  }
);

process.on('uncaughtException', err => {
  logger.error(`Uncaught ${err.stack}`);
});
process.on('unhandledRejection', promise => {
  logger.error(`Promise ${promise.stack}`);
});

module.exports = { requestLogger, logger };
