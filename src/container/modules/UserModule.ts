import { ContainerModule, interfaces } from 'inversify'
import { UserService } from '../../application/services/UserService'
import { USER_TYPES } from '../types/UserTypes'
import { UserController } from '../../presentation/user/UserController'

const userModuleContainer = new ContainerModule(
  (bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<UserService>(USER_TYPES.UserService).to(UserService)
    bind<UserController>(USER_TYPES.UserController).to(UserController)
  }
)

export default userModuleContainer
