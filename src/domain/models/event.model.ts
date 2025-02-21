import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
interface IEvent extends Document {
  userId: string
  date: Date
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties: string[] | null
  launchYear: number | null
  types: string[]
}

const eventSchema: Schema = new Schema<IEvent>({
  userId: {
    type: String,
    required: true,
    default: uuidv4
  },
  date: {
    type: Date,
    required: true
  },
  localName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  fixed: {
    type: Boolean,
    required: true
  },
  global: {
    type: Boolean,
    required: true
  },
  types: {
    type: [String],
    enum: ['Public'],
    required: true
  }
})

const EventModel = mongoose.model<IEvent>('Event', eventSchema)

export { EventModel, IEvent }
