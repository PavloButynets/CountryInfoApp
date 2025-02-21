import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator'

export class AddHolidaysDTO {
  @IsString()
  @Length(2)
  countryCode: string

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  holidays?: string[]

  @IsNumber()
  year: number
}
