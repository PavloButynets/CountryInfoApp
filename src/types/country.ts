export interface Country {
  code: string
  country: string
  iso3: string
  populationCounts: PopulationInfo[]
}

export interface PopulationInfo {
  value: number
  year: number
}
