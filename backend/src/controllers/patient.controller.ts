import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from "http-status-codes";
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler";
import { patientService, userService } from '../services';
import { CreateMedicalRecordDTO, UpdateMedicalRecordDTO } from '../dtos/medicalRecord.dto';
import { CreateAppointmentDTO } from '../dtos/appointment.dto';

import { uid } from './chat.controller';

// [GET] /patient/medical_record
export const getMedicalRecords = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const medicalRecords = await patientService.allMedicalRecords(userId)
    return res.status(StatusCodes.OK).json({
        data: medicalRecords
    });
})

// [POST] /patient/medical_record
export const createMedicalRecord = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const medicalRecordDTO = req.body as CreateMedicalRecordDTO
    const medicalRecord = await patientService.createMedicalRecord(userId, medicalRecordDTO)
    const { socket } = req.app.get("socket.io")
    if (uid[userId]) {
        socket.in(uid[userId]).emit('medical record', medicalRecord)
    }else {
        socket.emit('medical record', medicalRecord)
    }
    return res.status(StatusCodes.OK).json({
        data: medicalRecord
    });
})

// [PATCH] /patient/medical_record/:id
export const updateMedicalRecord = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const medicalRecordId = req.params.id
    const medicalRecordDTO = req.body as UpdateMedicalRecordDTO
    const medicalRecord = await patientService.updateMedicalRecord(medicalRecordId, medicalRecordDTO)
    return res.status(StatusCodes.OK).json({
        data: medicalRecord
    });
})

// [DELETE] /patient/medical_record/:id
export const deleteMedicalRecord = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const medicalRecordId = req.params.id
    const deletedMedicalRecord = await patientService.deleteMedicalRecord(medicalRecordId)
    return res.status(StatusCodes.OK).json({
        data: deletedMedicalRecord
    });
})

// [POST] /patient/appointment
export const makeAnAppointment = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const apm = req.body as CreateAppointmentDTO
    const appointment = await patientService.makeAnAppointment(userId, apm)
    
    const { socket } = req.app.get("socket.io")
    const noti = await userService.createNotification({
        userId: userId,
        content: 'Bạn vừa tạo cuộc hẹn mới',
        type: 'APPOINTMENT'
    })
    socket.emit("notification", noti.dataValues)

    return res.status(StatusCodes.OK).json({
        data: appointment
    });
})

// [GET] /patient/appointment
export const getAllAppointments = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const appointment = await patientService.getAllAppointments(userId)
    return res.status(StatusCodes.OK).json({
        data: appointment
    });
})

// [DELETE] /patient/appointment/:id
export const handlerAnAppointment = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const { id} = req.params
    const status = req.query.status as string
    const data = await patientService.handleAnAppointment(id, status)
    return res.status(StatusCodes.OK).json(data)
})