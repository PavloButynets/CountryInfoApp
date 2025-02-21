import mongoose from 'mongoose'

interface MongoDbOptions {
  database: string
  uri: string
}

export function connectMongoDb(options: MongoDbOptions) {
  mongoose
    .connect(`${options.uri}/${options.database}`)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error: Error) => {
      console.error('Error connecting to MongoDB:', error)
    })
}
