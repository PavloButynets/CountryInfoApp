import { Router } from "express";
import {countriesRoutes} from "../countries/routes";
import {calendarRoutes} from "../calendar/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        router.use("/countries", countriesRoutes());
        router.use("/calendar", calendarRoutes());
        router.use("*", (req, res) => {
            res.status(404).json({ message: "Not Found" });
        });

        return router;
    }
}