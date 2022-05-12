import { Sequelize } from 'sequelize'
import dbModels from '../database/models'
const dbConfig = require('./db.config')
const sequelize = new Sequelize(dbConfig)
const modelConfig: any = dbModels.modelsInitialization(sequelize, Sequelize)
modelConfig.sequelize = sequelize
modelConfig.Sequelize = Sequelize

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );

const verifyDbConnection = async () => {
    try {
      await modelConfig.sequelize.authenticate()
      console.log('>> DB Connected Successfully')
    } catch (error) {
        console.log(error.message)
    }
  }
  modelConfig.verifyDbConnection = verifyDbConnection()

  export default modelConfig