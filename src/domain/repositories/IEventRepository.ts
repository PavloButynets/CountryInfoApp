import { EventDTO } from '../../application/dto/EventDTO'

export interface IEventRepository {
  addHoliday: (eventDto: EventDTO) => Promise<void>
}
