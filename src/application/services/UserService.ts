import { inject, injectable } from 'inversify'
import axios from 'axios'
import { API_URLS } from '../../constants/URLs'
import { AddHolidaysDTO } from '../dto/AddHolidaysDTO'
import { EVENT_TYPES } from '../../container/types/EventTypes'
import { IEventRepository } from '../../domain/repositories/IEventRepository'

@injectable()
export class UserService {
  private _eventRepository: IEventRepository
  constructor(
    @inject(EVENT_TYPES.IEventRepository) eventRepository: IEventRepository
  ) {
    this._eventRepository = eventRepository
  }

  async addHolidaysToCalendar(
    holidaysDto: AddHolidaysDTO,
    userId: string
  ): Promise<any> {
    try {
      const { countryCode, year, holidays } = holidaysDto

      const holydaysDataResponse = await axios.get(
        API_URLS.HOLIDAYS_LIST.replace(':year', year.toString()).replace(
          ':countryCode',
          countryCode
        )
      )

      const filteredHolidays = holydaysDataResponse.data.filter(
        (holiday: any) => holidays?.includes(holiday.name)
      )

      const holidaysWithRequiredFields = filteredHolidays.map(
        (holiday: any) => ({
          date: holiday.date,
          localName: holiday.localName,
          name: holiday.name,
          countryCode: holiday.countryCode,
          fixed: holiday.fixed,
          global: holiday.global,
          userId: userId,
          types: holiday.types
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
