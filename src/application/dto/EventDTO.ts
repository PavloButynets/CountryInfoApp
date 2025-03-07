export class EventDTO {
  countryCode: string
  date: string
  fixed: boolean
  global: boolean
  localName: string
  name: string
  types: string[]
  userId: string

  constructor(
    date: string,
    localName: string,
    name: string,
    countryCode: string,
    fixed: boolean,
    global: boolean,
    userId: string,
    types: string[]
  ) {
    this.date = date
    this.localName = localName
    this.name = name
    this.countryCode = countryCode
    this.fixed = fixed
    this.global = global
    this.userId = userId
    this.types = types
  }
}
