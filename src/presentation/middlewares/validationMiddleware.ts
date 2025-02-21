import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export const validationMiddleware =
  (dto: any) => async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dto, req.body)

    const errors = await validate(instance)
    if (errors.length > 0) {
      res.status(422).json({
        errors: errors.map((err) => ({
          constraints: err.constraints,
          field: err.property
        })),
        message: 'Validation failed'
      })
    } else {
      req.body = instance
      next()
    }
  }
