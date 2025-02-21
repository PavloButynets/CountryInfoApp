import { Router } from 'express'

import { AppContainer } from '../../container'
import { COUNTRIES_TYPES } from '../../container/types/CountriesTypes'
import { CountriesController } from './CountriesController'

export const countriesRoutes = () => {
  const container = AppContainer.getInstance().getContainer()
  const router = Router()
  const countriesController = container.get<CountriesController>(
    COUNTRIES_TYPES.CountriesController
  )
  router.get('/AvailableCountries', countriesController.getAvailableCountries)
  router.get('/country-info/:countryCode', countriesController.getCountryInfo)

  return router
}
