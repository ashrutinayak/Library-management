import * as core from 'express-serve-static-core'
import express from 'express'
import cors from 'cors'
import routes from './routes/index.route'
import modelConfig from './config/model.config'
require('dotenv').config();

const corsOptions = {
    origin: `http://localhost:${process.env.PORT}`
  };

export async function createServer(): Promise<core.Express> {
    const server: core.Express = express()
    server.use(cors(corsOptions));
    // Body parsing
    server.use(express.json())
    server.use(express.urlencoded({ extended: false }))
    // api routes
    server.use('/',routes);
    return server
  }

  export async function startServer(
    expressServer: core.Express
  ): Promise<core.Express> {
    // verify db connection
    await modelConfig.verifyDbConnection
    expressServer.listen(process.env.PORT)
    console.log(`
    =================================================================
  
     Server started on port ${process.env.PORT} 
  
    =================================================================
    `)
    return expressServer
  }