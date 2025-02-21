import axios from 'axios'
import { inject, injectable } from 'inversify'

import { API_URLS } from '../../constants/URLs'
import { EVENT_TYPES } from '../../container/types/EventTypes'
import { IEventRepository } from '../../domain/repositories/IEventRepository'
import { AddHolidaysDTO } from '../dto/AddHolidaysDTO'

interface Holiday {
  countryCode: string
  date: string
  fixed: boolean
  global: boolean
  localName: string
  name: string
  types: string[]
}
@injectable()
export class UserService {
  private _eventRepository: IEventRepository
  constructor(
    @inject(EVENT_TYPES.IEventRepository) eventRepository: IEventRepository
  ) {
    this._eventRepository = eventRepository
  }

  public async addHolidaysToCalendar(
    holidaysDto: AddHolidaysDTO,
    userId: string
  ): Promise<void> {
    try {
      const { countryCode, holidays, year } = holidaysDto

      const holydaysDataResponse = await axios.get(
        API_URLS.HOLIDAYS_LIST.replace(':year', year.toString()).replace(
          ':countryCode',
          countryCode
        )
      )

      const filteredHolidays: Holiday[] = holydaysDataResponse.data.filter(
        (holiday: Holiday) => holidays?.includes(holiday.name)
      )

      const holidaysWithRequiredFields = filteredHolidays.map(
        (holiday: Holiday) => ({
          countryCode: holiday.countryCode,
          date: holiday.date,
          fixed: holiday.fixed,
          global: holiday.global,
          localName: holiday.localName,
          name: holiday.name,
          types: holiday.types,
          userId: userId
        })
      )

      for (const holidayData of holidaysWithRequiredFields) {
        await this._eventRepository.addHoliday(holidayData)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `API Error: ${error.response?.data?.message || error.message}`
        )
      } else {
        throw new Error('Failed to add holidays')
      }
    }
  }
}
