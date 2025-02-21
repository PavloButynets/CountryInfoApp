import { PopulationInfo } from '../../types/country'

export class CountryInfoDTO {
  borders: string[]
  flag: string
  population: PopulationInfo[]

  constructor(borders: string[], flag: string, population: PopulationInfo[]) {
    this.borders = borders
    this.flag = flag
    this.population = population
  }
}
