import {ContainerModule, interfaces} from 'inversify';
import {COUNTRIES_TYPES} from "../types/CountriesTypes";
import {CountriesService} from "../../application/services/CountriesService";
import {CountriesController} from "../../presentation/countries/CountriesController";

const countriesModuleContainer = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<CountriesService>(COUNTRIES_TYPES.CountriesService).to(CountriesService);
    bind<CountriesController>(COUNTRIES_TYPES.CountriesController).to(CountriesController);
});

export default countriesModuleContainer;
