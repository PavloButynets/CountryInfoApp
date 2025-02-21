import {
  IsString,
  IsArray,
  IsOptional,
  Length,
  IsNumber
} from 'class-validator'

export class AddHolidaysDTO {
  @IsString()
  @Length(2)
  countryCode: string

  @IsNumber()
  year: number

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  holidays?: string[]
}
