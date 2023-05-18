import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import CustomError from "../error/CustomError"

export default function ErrorWrapperHandler(controller : Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next)
        } catch (error) {
            console.log(error)
            if (error instanceof CustomError) {
                console.log("return ", error.statusCode, "and:", {
                    message: (error as CustomError).getMessage()
                })
                return res.status(error.statusCode).json({
                    message: (error as CustomError).getMessage()
                })
            }

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong'
            })
        }
    }
}