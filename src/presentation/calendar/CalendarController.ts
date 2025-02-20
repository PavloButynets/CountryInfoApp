import { Request, Response } from 'express';
import { CalendarService } from '../../application/services/CalendarService';
import { AddHolidaysDTO } from '../../application/dto/AddHolidaysDTO';
import {inject, injectable} from "inversify";
import {CALENDAR_TYPES} from "../../container/types/CalendarTypes";

@injectable()
export class CalendarController {
    private _calendarService: CalendarService;

    constructor(@inject(CALENDAR_TYPES.CalendarService) calendarService: CalendarService) {
        this._calendarService = calendarService;
    }

    async addHolidaysToCalendar(req: Request, res: Response) {
        try {
            const userId =  '1' //req.params.userId;
            const { countryCode, year, holidays }: AddHolidaysDTO = req.body;

            const holidaysDto = new AddHolidaysDTO();
            holidaysDto.userId = userId;
            holidaysDto.countryCode = countryCode;
            holidaysDto.year = year;
            holidaysDto.holidays = holidays;
            const events = await this._calendarService.addHolidaysToCalendar(holidaysDto);

            res.status(200).json({
                message: "Holidays added to calendar",
                events: events
            });
        } catch (error) {
            res.status(500).json({ message: 'Error: Holidays cannot be added to calendar' });
        }
    }
}
