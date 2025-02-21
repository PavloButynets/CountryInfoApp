import { EventRepository } from '../../infrastructure/repositories/EventRepository'
import { EVENT_TYPES } from '../types/EventTypes'
import { ContainerModule } from 'inversify'

const eventModuleContainer = new ContainerModule((bind) => {
  bind<EventRepository>(EVENT_TYPES.IEventRepository).to(EventRepository)
})

export default eventModuleContainer
