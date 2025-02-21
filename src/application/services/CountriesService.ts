import { injectable } from 'inversify'
import axios from 'axios'
import { API_URLS } from '../../constants/URLs'
import { CountryInfoDTO } from '../dto/CountryInfoDTO'
import { Country } from '../../types/country'

type BorderCountry = {
  commonName: string
  officialName: string
  countryCode: string
  borders: Country[]
}

@injectable()
export class CountriesService {
  constructor() {}

  async getAvailableCountries(): Promise<string[]> {
    try {
      const response = await axios.get(API_URLS.AVAILABLE_COUNTRIES)
      return response.data
    } catch (error) {
      throw new Error('Failed to fetch countries')
    }
  }

  async getAvailableCountry(countryCode: string): Promise<CountryInfoDTO> {
    try {
      const [borderCountries, populationResponse, flagsResponse] =
        await Promise.all([
          axios.get(
            API_URLS.BORDER_COUNTRIES.replace(':countryCode', countryCode)
          ),
          axios.get(API_URLS.COUNTRY_POPULATION_DATA),
          axios.get(API_URLS.COUNTRY_FLAG_IMAGE)
        ])

      const countryName: string = borderCountries.data.commonName

      const borderCountriesNames = borderCountries.data.borders.map(
        (borderCountry: BorderCountry) => borderCountry.commonName
      )
      const countryPopulation = populationResponse.data.data.find(
        (country: Country) => country.country === countryName
      )
      const countryFlag = flagsResponse.data.data.find(
        (flag: any) => flag.name === countryName
      )

      if (!countryPopulation || !countryFlag) {
        throw new Error(
          `Country data (population or flag) not found for ${countryName}`
        )
      }

      return new CountryInfoDTO(
        borderCountriesNames,
        countryFlag.flag,
        countryPopulation.populationCounts
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `API Error: ${error.response?.data?.message || error.message}`
        )
      } else {
        throw new Error('Failed to fetch country')
      }
    }
  }
}
