import mongoose, { Document, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
interface IEvent extends Document {
  counties: null | string[]
  countryCode: string
  date: Date
  fixed: boolean
  global: boolean
  launchYear: null | number
  localName: string
  name: string
  types: string[]
  userId: string
}

const eventSchema: Schema = new Schema<IEvent>({
  countryCode: {
    required: true,
    type: String
  },
  date: {
    required: true,
    type: Date
  },
  fixed: {
    required: true,
    type: Boolean
  },
  global: {
    required: true,
    type: Boolean
  },
  localName: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  types: {
    enum: ['Public'],
    required: true,
    type: [String]
  },
  userId: {
    default: uuidv4,
    required: true,
    type: String
  }
})

const EventModel = mongoose.model<IEvent>('Event', eventSchema)

export { EventModel, IEvent }
