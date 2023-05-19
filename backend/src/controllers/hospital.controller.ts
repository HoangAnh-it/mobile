import { NextFunction, Request, Response } from 'express'

import ErrorWrapperHandler from "../utils/ErrorWrapperHandler"
import { StatusCodes } from 'http-status-codes'
import * as hospitalService from '../services/hospital.service'

// [GET] /hospital/:id
export const hospitalInfo = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const h = await hospitalService.info(req.params.id)
    return res.status(StatusCodes.OK).json({
        data: h
    })
})

// [GET] /hospital/:id/department
export const getDepartments = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const d = await hospitalService.getDepartment(req.params.id)
    console.log(d.length)
    return res.status(StatusCodes.OK).json({
        data: d
    })
})