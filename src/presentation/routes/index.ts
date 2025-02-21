import { Router } from 'express'

import { countriesRoutes } from '../countries/routes'
import { userRoutes } from '../user/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/countries', countriesRoutes())
    router.use('/users', userRoutes())
    router.use('*', (req, res) => {
      res.status(404).json({ message: 'Not Found' })
    })

    return router
  }
}
