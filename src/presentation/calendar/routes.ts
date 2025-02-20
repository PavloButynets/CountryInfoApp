import { Router } from 'express';
import { AppContainer } from '../../container';
import {CalendarController} from "./CalendarController";
import {CALENDAR_TYPES} from "../../container/types/CalendarTypes";


export const calendarRoutes = () => {
    const container = AppContainer.getInstance().getContainer();
    const router = Router();
    const calendarControler = container.get<CalendarController>(CALENDAR_TYPES.CalendarController);

    router.post('/holidays', calendarControler.addHolidaysToCalendar.bind(calendarControler));
    return router
}