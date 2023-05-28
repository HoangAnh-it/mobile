import { StatusCodes } from "http-status-codes";
import { appointmentService, doctorService } from "."
import { CreateMedicalResultDTO } from "../dtos/medicalResult.dto";
import CustomError from "../error/CustomError";
import { Appointment, Department, DoAppointment, MedicalRecord, TestPackage, User } from "../models"
import { MedicalResult } from "../models/MedicalResults";

export const allAppointments = async (userId: string, query: {[key:string]: any}) => {
    const appointments = await appointmentService.getAllAppointments(userId, query);
    return appointments.filter(a => a.getDoAppointment() !== null);
}

export const createResultAppointment = async (appointmentId: string, medicalResult: CreateMedicalResultDTO) => {
    const appointment = await Appointment.findByPk(appointmentId, {
        include: {
            model: MedicalResult,
            attributes: ["medicalResultId"]
        }
    })
    if (!appointment) {
        throw new CustomError(StatusCodes.NOT_FOUND, "Appointment not found");
    }
    
    if (appointment.getMedicalResult() !== null) {
        throw new CustomError(StatusCodes.NOT_FOUND, "Appointment has already a result");
    }

    const result  = await MedicalResult.create({
        disease: medicalResult.disease,
        medicines: JSON.stringify(medicalResult.medicines),
        note: medicalResult.note,
        appointmentId: appointmentId
    })

    await appointmentService.changeStatus(appointmentId, "DONE");
    return {
        id: appointmentId,
        status: 'DONE',
        result: result.dataValues
    }
}

export const getBusyTime = async (doctorId: string) => {
    return  await Appointment.findAll({
        include: {
            model: DoAppointment,
            include: [{
                model: User,
                attributes: ["name"],
                where: {
                    userId: doctorId
                }
            }]
        },
        attributes: ["dateTime"]
    })
}