import { AppContainer } from "./container";
import { AppRoutes } from "./presentation/routes";
import { createServer } from "./config/createServer";

const port = +(process.env.PORT || "5000");
const appContainer = AppContainer.getInstance();
appContainer.loadModules();
createServer({ port, routes: AppRoutes.routes });