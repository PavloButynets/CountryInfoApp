import { inject, injectable } from "inversify";
import { Request, Response } from 'express';
import {CountriesService} from "../../application/services/CountriesService";
import {COUNTRIES_TYPES} from "../../container/types/CountriesTypes";
import {BaseController} from "../BaseController";

@injectable()
export class CountriesController extends BaseController{
    private _countriesService: CountriesService;

    constructor(@inject(COUNTRIES_TYPES.CountriesService) countriesService: CountriesService) {
        super();
        this._countriesService = countriesService;
    }

    getAvailableCountries = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log("count1")
            const countries = await this._countriesService.getAvailableCountries();
            console.log(countries)
            res.status(200).json(countries);
        } catch (error) {
            this.ErrorStatus(error, res);
        }
    }

    getCountryInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const countryCode = req.params.countryCode;
            const country = await this._countriesService.getAvailableCountry(countryCode);
            res.status(200).json(country);
        } catch (error) {
            this.ErrorStatus(error, res);
        }
    }
}