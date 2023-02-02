import {Express, NextFunction, Request, Response } from 'express'
import { ValidateError } from 'tsoa'


export interface ValidateErrorJson {
    message: "Validation failed",
    details: { [name: string]: unknown };
}

export const prepareErrorHandlers = (app: Express) => {
    app.use(function notFoundHandler(_req, res: Response) {
        res.status(404).send({
            message: 'Not found'
        })
    })

    app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
        if (err instanceof ValidateError) {
            return res.status(422).json({
                message: "Validation failed",
                details: err?.fields
            })
        }
        if (err instanceof Error) {
            return res.status(500).json({
                message: 'Internal server error'
            })
        }
        next()
    })
}