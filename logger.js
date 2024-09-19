const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const { combine, timestamp, printf, colorize } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: false,
      maxSize: '30m',
      maxFiles: '15d',
    }),
  ],
})

module.exports = logger
