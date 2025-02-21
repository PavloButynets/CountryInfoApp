import dotenv from 'dotenv'

import { createServer } from './config/createServer'
import { connectMongoDb } from './config/dbConfig'
import { AppContainer } from './container'
import { AppRoutes } from './presentation/routes'

dotenv.config()
const port = +(process.env.PORT ?? '5000')
const appContainer = AppContainer.getInstance()
appContainer.loadModules()
connectMongoDb({
  database: process.env.MONGO_DATABASE!,
  uri: process.env.MONGO_DB_URL!
})
createServer({ port, routes: AppRoutes.routes })
