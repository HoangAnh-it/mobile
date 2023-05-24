import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from "http-status-codes";
import { doctorService } from "../services";
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler";

// [GET] /doctor/appointment
export const allAppointments = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const apps = await doctorService.allAppointments(userId);
    return res.status(StatusCodes.OK).json({
        data: apps
    });
})