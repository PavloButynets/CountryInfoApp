import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { AddHolidaysDTO } from '../../application/dto/AddHolidaysDTO'
import { UserService } from '../../application/services/UserService'
import { USER_TYPES } from '../../container/types/UserTypes'

@injectable()
export class UserController {
  private _calendarService: UserService

  constructor(
    @inject(USER_TYPES.UserService) public calendarService: UserService
  ) {
    this._calendarService = calendarService
  }

  public async addHolidaysToCalendar(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.params.userId
      const { countryCode, holidays, year }: AddHolidaysDTO = req.body

      const holidaysDto = new AddHolidaysDTO()
      holidaysDto.countryCode = countryCode
      holidaysDto.year = year
      holidaysDto.holidays = holidays
      await this._calendarService.addHolidaysToCalendar(holidaysDto, userId)

      res.status(200).json({
        message: 'Holidays added to user'
      })
    } catch {
      res
        .status(500)
        .json({ message: 'Error: Holidays cannot be added to user' })
    }
  }
}
