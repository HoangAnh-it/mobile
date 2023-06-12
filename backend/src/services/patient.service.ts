
import { StatusCodes } from 'http-status-codes';
import CustomError from "../error/CustomError";
import { User, Patient, MedicalRecord, Appointment, Department, Hospital, TestPackage, DoAppointment, MedicalResult } from "../models";
import { CreateMedicalRecordDTO, UpdateMedicalRecordDTO } from '../dtos/medicalRecord.dto';
import { validateCreateMedicalRecord, validateUpdateMedicalRecord } from '../validator/patient';
import { CreateAppointmentDTO } from '../dtos/appointment.dto';
import { convertDateTime } from '../utils/converter';
import { validateCreateAppointment } from '../validator/appointment';
import { appointmentService } from '.';
import { Sequelize } from 'sequelize-typescript';

export const allMedicalRecords = async (userId: string) => {
    const user = await User.findByPk(userId, {
        include: [{
            model: Patient,
            include: [
                {
                    model: MedicalRecord
                }
            ]
        }]
    })
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User with ID: ${userId} not found.`)
    }
    if (!user.GetPatient()) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User with ID: ${userId} is not a patient.`)
    }
    return user.GetPatient().GetMedicalRecords()
}

export const createMedicalRecord = async(userId: string, medicalRecordDTO: CreateMedicalRecordDTO) => {
    const user = await User.findByPk(userId, {
        attributes: ["userId"],
        include: {
            model: Patient,
            attributes: ["patientId"]
        }
    })
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User with ID: ${userId} not found.`)
    }

    medicalRecordDTO = validateCreateMedicalRecord(medicalRecordDTO)
    medicalRecordDTO.patientId = user.GetPatient().patientId
    const medicalRecord  = await MedicalRecord.create({...medicalRecordDTO})
    return medicalRecord.dataValues
}

export const updateMedicalRecord = async (id: string, medicalRecordDTO: UpdateMedicalRecordDTO) => {
    console.log(medicalRecordDTO)
    const medicalRecord = await MedicalRecord.findByPk(id)
    if (!medicalRecord) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Medical record with ID: ${id} not found.`)
    }
    medicalRecordDTO = validateUpdateMedicalRecord(medicalRecordDTO)
    await MedicalRecord.update(medicalRecordDTO, {
        where: {
            medicalRecordId: id
        }
    })
    return await MedicalRecord.findByPk(id)
}

export const deleteMedicalRecord = async (id: string) =>{
    const medicalRecord = await MedicalRecord.findByPk(id)
    if (!medicalRecord) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Medical record with ID: ${id} not found.`)
    }
    await MedicalRecord.destroy({
        where: {
            medicalRecordId: id
        }
    })
    return medicalRecord
}

export const makeAnAppointment = async (userId: string, apm: CreateAppointmentDTO) => {
    console.log(apm)
    const user = await User.findByPk(userId)
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User with ID: ${userId} not found.`)
    }
    apm = validateCreateAppointment(apm)
    const existingMedicalRecord = await MedicalRecord.findByPk(apm.medicalRecordId)
    if (!existingMedicalRecord) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Medical Record with ID: ${apm.medicalRecordId} not found.`)
    }
    const dateApm = convertDateTime(apm.date, apm.time)
    const appointment = {
        status: 'PENDING',
        dateTime: dateApm,
        medicalRecordId: apm.medicalRecordId,
        testPackageId: apm.testPackageId || null,
        departmentId: apm.departmentId || null
    }
    return await Appointment.create({ ...appointment })
}

export const getAllAppointments = async(userId : string) => {
    const user = await User.findByPk(userId)
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User with ID: ${userId} not found.`)
    }
    return Appointment.findAll({
        include: [
            {
                model: MedicalRecord,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [{
                    model: Patient,
                    where: { userId },
                    attributes: ["userId"],
                    required: true,
                }],
                required: true
            },
            {
                model: Department,
                attributes: ["departmentId", "HospitalId", "name"],
                include: [
                    {
                        model: Hospital,
                        attributes: ["hospitalId", "userId"],
                        include: [{
                            model: User,
                            attributes: ["name", "address"],
                            where: {
                                role: 'HOSPITAL'
                            }
                        }]
                    }
                ]
            },
            {
                model: TestPackage,
                include: [{
                    model: Department,
                    attributes: ["departmentId", "name", "hospitalId"],
                    include: [
                        {
                            model: Hospital,
                            attributes: ["hospitalId", "userId"],
                            include: [{
                                model: User,
                                attributes: ["name", "address"],
                                where: {
                                    role: 'HOSPITAL'
                                }
                            }]
                        }
                    ]
                }]
            }
            ,
            {
                model: DoAppointment,
                include: [{
                    model: User,
                    attributes: ["name"],
                    where: {
                        role: 'DOCTOR'
                    }
                }]
            },
            {
                model: MedicalResult,
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
            }
        ],
    })
}

export const handleAnAppointment = async(id: string, status: string) => {
    const app = await Appointment.findByPk(id)
    if (!app) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Appointment with ID: ${id} not found`)
    }
    await appointmentService.changeStatus(id, status)
    return {id, status}
}

export const busyTime = async (userId: string, day: string, departmentId: string) => {
    const date = new Date(day)

    const existingAppointmentsDateTime = await Appointment.findAll({
        attributes: ["dateTime"],
        where: Sequelize.literal(`DAY(dateTime) = ${date.getDate()} AND MONTH(dateTime) = ${date.getMonth() + 1}`),
        include: {
            model: MedicalRecord,
            attributes: [],
            include: [{
                model: Patient,
                attributes: [],
                include: [{
                    model: User,
                    attributes: [],
                    where: {userId: userId}
                }]
            }]
        }
    })

    return existingAppointmentsDateTime.map(d => {
        const _d = new Date(d.dataValues.dateTime)
        const h = _d.getHours() < 10 ? `0${_d.getHours()}`: _d.getHours()
        const m = _d.getMinutes() < 10 ? `0${_d.getMinutes()}` : _d.getMinutes()
        return `${h}:${m}`
    })
}