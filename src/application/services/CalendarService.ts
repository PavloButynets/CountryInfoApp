import { injectable} from "inversify";
import axios from "axios";
import {API_URLS} from "../../constants/URLs";
import {AddHolidaysDTO} from "../dto/AddHolidaysDTO";



@injectable()
export class CalendarService {
    constructor() {}

    async addHolidaysToCalendar(holidaysDto: AddHolidaysDTO): Promise<any> {
        try{
            const { userId, countryCode, year, holidays } = holidaysDto;

            const holydaysDataResponse = await axios.get(API_URLS.HOLIDAYS_LIST
                .replace(':year', year.toString())
                .replace(':countryCode', countryCode));

            const filteredHolidays = holydaysDataResponse.data
                .filter((holiday: any) => holidays?.includes(holiday.name));



        }catch (error){
            throw new Error("Failed to add holidays")
        }
    }
}