import {Response} from 'express';

export class BaseController {
    ErrorStatus(error: unknown, response: Response) {
        return response.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : null,
        });
    }
}