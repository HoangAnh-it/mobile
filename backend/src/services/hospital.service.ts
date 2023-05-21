import { StatusCodes } from 'http-status-codes';
import CustomError from "../error/CustomError";
import { Appointment, Department, DoAppointment, Hospital, MedicalRecord, Patient, TestPackage, User } from "../models";
import { CreateDepartmentDTO } from '../dtos/department.dto';
import { Op } from 'sequelize'

export const info = async(id: string) => {
    return User.findOne({
        where: {
            userId: id,
            role: 'HOSPITAL'
        },
        attributes: ["userId", "name", "address", "avatar"],
        include: {
            model: Hospital,
            attributes: ["hospitalId", "description"]
        }
    })
}

export const getDepartment = async (id: string) => {
    console.log(id)
    return await Department.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: Hospital,
            attributes: ["hospitalId", "userId"],
            include: [{
                model: User,
                attributes: ["userId"],
                where: {
                    userId: id
                },
                required: true,
            }],
            required: true,
        }
    })
}

export const getAllAppointment = async (id: string, query: { [key:string]: any }) => {
    const status = query.status || 'ALL'
    const type = query.type || 'ALL'
    const searchName = query.search?.trim() || ""

    const filter: { [key: string]: any } = {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: Department,
                attributes: ["departmentId", "name"],
                include: [{
                    model: Hospital,
                    attributes: ["userId"],
                    include: [{
                        model: User,
                        attributes: ["name"],
                        where: {
                            userId: id,
                        },
                        required: true
                    }],
                    required: true
                }],
            },
            
            {
                model: TestPackage,
                attributes: ["testPackageId", "name"],
                include: [
                    {
                        model: Department,
                        attributes: ["departmentId", "name"],
                        include: [{
                            model: Hospital,
                            attributes: ["userId"],
                            include: [{
                                model: User,
                                attributes: [],
                                where: {
                                    userId: id,
                                },
                                required: true
                            }],
                            required: true
                        }],
                    }
                ]
            },

            {
                model: MedicalRecord,
                where: {
                    name: {
                        [Op.like]: `%${searchName}%`
                    }
                },
                include: [{
                    model: Patient,
                    attributes: ["userId"]
                }]
            },

            {
                model: DoAppointment,
                include: [{
                    model: User,
                    attributes: ["userId"],
                    where: {
                        userId: id,
                    },
                }]
            }
        ]
    }

    if (status !== 'ALL') {
        filter.where = {status}
    }
    
    let appos =  await Appointment.findAll(filter)
    appos = appos.filter(a => {
        switch (type) {
            case 'AT_HOME':
                return a.getDepartment() === null && a.getTestPackage() !== null
            
            case 'FACE_TO_FACE':
                return a.getTestPackage() === null && a.getDepartment() !== null
            
            default:
                return a.getDepartment() !== null || a.getTestPackage() !== null
        }
    });
    
    return appos
}

export const rejectAppointment = async(hospitalId: string, appointmentId: string) => {
    const existingAppointment = await Appointment.findOne({
        where: { appointmentId },
        include: [
            {
                model: Department,
                attributes: ["departmentId", "name"],
                include: [{
                    model: Hospital,
                    attributes :["userId"],
                    include: [{
                        model: User,
                        attributes: [],
                        where: {
                            userId: hospitalId
                        },
                        required: true
                    }],
                    required: true
                }],
            },
            
            {
                model: TestPackage,
                include: [{
                    model: Department,
                    attributes: ["departmentId", "hospitalId"],
                    include: [{
                        model: Hospital,
                        attributes :["userId"],
                        include: [{
                            model: User,
                            attributes: [],
                            where: {
                                userId: hospitalId
                            },
                            required: true
                        }],
                        required: true
                    }],
                }]
            },
        ]
    })

    if (!existingAppointment) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Your dont have permission for rejecting appointment with ID ${appointmentId}`)
    }

    await existingAppointment.update({
        status: 'REJECTED'
    })

    return existingAppointment.appointmentId
}

export const assignDoctorAppointment = async (appointmentId: string, userDoctorId: string) => {
    const doctor = await User.findByPk(userDoctorId, {
        attributes: ["name"]
    })
    if (!doctor) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Doctor with ID: ${userDoctorId} not found`)
    }
    await DoAppointment.create({
        userId: userDoctorId,
        appointmentId: appointmentId
    })

    await Appointment.update({
        status: 'ACCEPTED'
    }, {
        where: {
            appointmentId
        }
    })
    return { id: appointmentId, status: 'ACCEPTED', doctor: doctor.dataValues.name }
}

export const createDepartment = async (userHospitalId: string, department: CreateDepartmentDTO) => {
    const existingDepartment = await Department.findOne({
        where: {
            name: department.name
        }
    })

    if (existingDepartment) {
        throw new CustomError(StatusCodes.CONFLICT, `Department with name: ${department.name}} already existed`)
    }

    const userHospital = await User.findByPk(userHospitalId, {
        include: {
            model: Hospital,
            attributes: ["hospitalId"]
        }
    }) 
    
    return await Department.create({
        hospitalId: (userHospital?.dataValues as { [key: string]: any })?.hospitals?.hospitalId,
        ...department
    })
}