import { Response } from 'express'

export class BaseController {
  ErrorStatus(error: unknown, response: Response) {
    return response.status(500).json({
      error: error instanceof Error ? error.message : String(error),
      message: 'Internal Server Error',
      stack: error instanceof Error ? error.stack : null
    })
  }
}
