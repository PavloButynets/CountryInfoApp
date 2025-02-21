import { Model } from 'mongoose'

import { EventDTO } from '../../application/dto/EventDTO'
import { EventModel, IEvent } from '../../domain/models/event.model'
import { IEventRepository } from '../../domain/repositories/IEventRepository'

export class EventRepository implements IEventRepository {
  private readonly _eventModel: Model<IEvent>

  constructor() {
    this._eventModel = EventModel
  }

  public async addHoliday(eventDto: EventDTO): Promise<void> {
    try {
      const newEvent = new this._eventModel(eventDto)
      await newEvent.save()
    } catch (error) {
      console.log(error)
      throw new Error('Failed to add holiday')
    }
  }
}
