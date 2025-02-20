import {
    IsString,
    IsArray,
    IsOptional,
    IsDate,
    Length
} from 'class-validator';

export class AddHolidaysDTO {
    @IsString()
    userId: string;

    @IsString()
    @Length(2)
    countryCode: string;

    @IsDate()
    year: number;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    holidays?: string[];
}
