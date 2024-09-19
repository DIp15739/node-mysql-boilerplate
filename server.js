require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
const { sequelize } = require('./database/connection')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const logger = require('./logger')
const morgan = require('morgan')
const logRequestResponseMiddleware = require('./src/V1.0.0/middleware/logRequestResponse')

sequelize
  .authenticate()
  .then(() => {
    logger.info(`Database connected`)
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err)
  })

const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${process.env.IP_URL_LOCAL}/doc/swagger.json`,
        name: 'V1',
      },
    ],
    servers: [
      {
        url: `${process.env.IP_URL_LOCAL}`,
      },
    ],
  },
}

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options))

app.use('/doc', express.static(path.join(__dirname, './src/V1.0.0/docs')))

app.use(cors())

app.use(express.json())

app.use(logRequestResponseMiddleware)

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./src/index'))

app.listen(port, () => {
  logger.info(`server listening on ${port}`)
})
