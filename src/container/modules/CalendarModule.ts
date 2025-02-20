import {ContainerModule, interfaces} from 'inversify';
import {CalendarService} from "../../application/services/CalendarService";
import {CALENDAR_TYPES} from "../types/CalendarTypes";
import {CalendarController} from "../../presentation/calendar/CalendarController";

const calendarModuleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<CalendarService>(CALENDAR_TYPES.CalendarService).to(CalendarService);
    bind<CalendarController>(CALENDAR_TYPES.CalendarController).to(CalendarController);
});

export default calendarModuleContainer;
