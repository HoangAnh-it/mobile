import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from "http-status-codes";
import { appointmentService, doctorService } from "../services";
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler";
import { CreateMedicalResultDTO } from '../dtos/medicalResult.dto';

// [GET] /doctor/appointment
export const allAppointments = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const apps = await doctorService.allAppointments(userId, req.query as { type: string, status: string });
    return res.status(StatusCodes.OK).json({
        data: apps
    });
})

// [POST] /doctor/appointment/:id/result
export const createResultAppointment = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const d = await doctorService.createResultAppointment(appointmentId, req.body as CreateMedicalResultDTO)
    return res.status(StatusCodes.OK).json({
        data: d
    });
})
