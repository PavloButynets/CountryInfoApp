import { Router } from 'express'
import { AppContainer } from '../../container'
import { UserController } from './UserController'
import { USER_TYPES } from '../../container/types/UserTypes'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { AddHolidaysDTO } from '../../application/dto/AddHolidaysDTO'

export const userRoutes = () => {
  const container = AppContainer.getInstance().getContainer()
  const router = Router()

  const userControler = container.get<UserController>(USER_TYPES.UserController)

  router.post(
    '/:userId/calendar/holidays',
    validationMiddleware(AddHolidaysDTO),
    userControler.addHolidaysToCalendar.bind(userControler)
  )
  return router
}
