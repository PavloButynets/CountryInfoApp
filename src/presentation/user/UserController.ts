import { NextFunction, Request, Response } from 'express'
import { UserService } from '../../application/services/UserService'
import { AddHolidaysDTO } from '../../application/dto/AddHolidaysDTO'
import { inject, injectable } from 'inversify'
import { USER_TYPES } from '../../container/types/UserTypes'

@injectable()
export class UserController {
  private _calendarService: UserService

  constructor(@inject(USER_TYPES.UserService) calendarService: UserService) {
    this._calendarService = calendarService
  }

  async addHolidaysToCalendar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.userId
      const { countryCode, year, holidays }: AddHolidaysDTO = req.body

      const holidaysDto = new AddHolidaysDTO()
      holidaysDto.countryCode = countryCode
      holidaysDto.year = year
      holidaysDto.holidays = holidays
      await this._calendarService.addHolidaysToCalendar(holidaysDto, userId)

      res.status(200).json({
        message: 'Holidays added to user'
      })
    } catch (error) {
      next(error)
    }
  }
}
