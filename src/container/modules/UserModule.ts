import { ContainerModule, interfaces } from 'inversify'

import { UserService } from '../../application/services/UserService'
import { UserController } from '../../presentation/user/UserController'
import { USER_TYPES } from '../types/UserTypes'

const userModuleContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserService>(USER_TYPES.UserService).to(UserService)
  bind<UserController>(USER_TYPES.UserController).to(UserController)
})

export default userModuleContainer
