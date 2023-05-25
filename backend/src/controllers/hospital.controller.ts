import { NextFunction, Request, Response } from 'express'

import ErrorWrapperHandler from "../utils/ErrorWrapperHandler"
import { StatusCodes } from 'http-status-codes'
import * as hospitalService from '../services/hospital.service'
import { CreateDepartmentDTO } from '../dtos/department.dto'

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
    return res.status(StatusCodes.OK).json({
        data: d
    })
})

// [GET] /hospital/:id/appointment
export const getAllAppointments = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const d = await hospitalService.getAllAppointment(req.params.id, req.query as { type: string, status: string })
    return res.status(StatusCodes.OK).json({
        data: d
    })
})

// [GET] /hospital/appointment/:id?status
export const handleAppointments = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const appointmentId = req.params.id
    const authID = req.auth?.id
    const status = req.query.status
    let appId;
    switch (status) {
        case 'REJECTED':
            appId = await hospitalService.rejectAppointment(authID, appointmentId)
            break;
        default:
            break
    }
    console.log("appID", appId)
    return res.status(StatusCodes.OK).json({id: appId, status})
})

// [POST] /hospital/assign_doctor_appointment
export const assignDoctorAppointment = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const d = await hospitalService.assignDoctorAppointment(req.body.appointmentId, req.body.userDoctorId)
    return res.status(StatusCodes.OK).json(d)
})

// [POST] /hospital/department
export const createDepartment = ErrorWrapperHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authID = req.auth?.id
    const newDe = await hospitalService.createDepartment(authID, req.body as CreateDepartmentDTO)
    return res.status(StatusCodes.OK).json({
        data: newDe
    })
})