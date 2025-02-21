import { ContainerModule, interfaces } from 'inversify'

import { CountriesService } from '../../application/services/CountriesService'
import { CountriesController } from '../../presentation/countries/CountriesController'
import { COUNTRIES_TYPES } from '../types/CountriesTypes'

const countriesModuleContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<CountriesService>(COUNTRIES_TYPES.CountriesService).to(
      CountriesService
    )
    bind<CountriesController>(COUNTRIES_TYPES.CountriesController).to(
      CountriesController
    )
  }
)

export default countriesModuleContainer
