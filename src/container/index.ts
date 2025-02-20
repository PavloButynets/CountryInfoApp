import { Container } from 'inversify';
import countriesModuleContainer from "./modules/CountriesModule";
import calendarModuleContainer from "./modules/CalendarModule";

export class AppContainer {
    private static _instance: AppContainer | null = null; // Singleton instance
    private container: Container;

    private constructor() {
        this.container = new Container();
    }

    public static getInstance(): AppContainer {
        if (!AppContainer._instance) {
            AppContainer._instance = new AppContainer();
        }
        return AppContainer._instance;
    }

    public loadModules(): void {
        this.container.load(countriesModuleContainer);
        this.container.load(calendarModuleContainer);
    }

    public getContainer(): Container {
        return this.container;
    }

}