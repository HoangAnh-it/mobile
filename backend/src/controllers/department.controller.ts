import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from "http-status-codes";
import { departmentService } from "../services";
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler";

// [GET] /department
export const allDepartment = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const d = await departmentService.allDepartments()
    return res.status(StatusCodes.OK).json({
        data: d
    });
})

// [GET] /department/:id/doctor?date&time
export const getDoctors = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const departmentId = req.params.id
    const d = await departmentService.getAllDoctors(departmentId, req.query as {
        date: string,
        time: string,
        name: string,
    })
    return res.status(StatusCodes.OK).json({
        data: d
    });
})