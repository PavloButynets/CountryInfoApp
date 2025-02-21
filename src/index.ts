import dotenv from 'dotenv'
import { AppContainer } from './container'
import { AppRoutes } from './presentation/routes'
import { createServer } from './config/createServer'
import { connectMongoDb } from './config/dbConfig'

dotenv.config()
const port = +(process.env.PORT || '5000')
const appContainer = AppContainer.getInstance()
appContainer.loadModules()
connectMongoDb({
  uri: process.env.MONGO_DB_URL as string,
  database: process.env.MONGO_DATABASE as string
})
createServer({ port, routes: AppRoutes.routes })
