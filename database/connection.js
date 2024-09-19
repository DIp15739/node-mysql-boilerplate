require('dotenv').config()
const Sequelize = require('sequelize')
const DataTypes = require('sequelize')

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: process.env.DB_TIMEZONE,
  define: {
    freezeTableName: true,
  },
  logging: false,
})

const resource = require('../src/V1.0.0/models/resourcesModel')(
  sequelize,
  DataTypes
)

const user = require('../src/V1.0.0/models/userModel')(sequelize, DataTypes)

module.exports = {
  sequelize,
  resource,
  user,
}
