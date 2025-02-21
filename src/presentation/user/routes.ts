import { Router } from 'express'

import { AddHolidaysDTO } from '../../application/dto/AddHolidaysDTO'
import { AppContainer } from '../../container'
import { USER_TYPES } from '../../container/types/UserTypes'
import { validationMiddleware } from '../middlewares/validationMiddleware'
import { UserController } from './UserController'

export const userRoutes = (): Router => {
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
