import axios from 'axios'
import { injectable } from 'inversify'

import { API_URLS } from '../../constants/URLs'
import { Country } from '../../types/country'
import { CountryInfoDTO } from '../dto/CountryInfoDTO'

interface BorderCountry {
  borders: Country[]
  commonName: string
  countryCode: string
  officialName: string
}

interface Flag {
  flag: string
  iso2: string
  iso3: string
  name: string
}

@injectable()
export class CountriesService {
  async getAvailableCountries(page: number, limit: number): Promise<{ countries: string[], totalCount: number }> {
    try {
      const response = await axios.get(API_URLS.AVAILABLE_COUNTRIES)
      const countries = response.data;

      const totalCount: number = countries.length;
      const startIndex: number = (page - 1) * limit
      const endIndex: number = page * limit

      const paginatedCountries = countries.slice(startIndex, endIndex)

      return { countries: paginatedCountries, totalCount }
    } catch {
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

      const borderCountriesNames: string[] = borderCountries.data.borders.map(
        (borderCountry: BorderCountry) => borderCountry.commonName
      )
      const countryPopulation: Country = populationResponse.data.data.find(
        (country: Country) => country.country === countryName
      )
      const countryFlag: Flag = flagsResponse.data.data.find(
        (flag: Flag) => flag.name === countryName
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
