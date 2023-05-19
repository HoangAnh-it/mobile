import { Request, Response, NextFunction } from 'express'

import { StatusCodes } from "http-status-codes"
import { testPackage } from "../services"
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler"

// [GET] /test_package/:id
export const detail = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const testPackages = await testPackage.detail(req.params.id)
    return res.status(StatusCodes.OK).json({
        data: testPackages
    })
})

// [GET] /test_package
export const getAll = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const testPackages = await testPackage.allTestPackages()
    return res.status(StatusCodes.OK).json({
        data: testPackages
    })
})