import { Appointment, Department, DoAppointment, Hospital, MedicalRecord, MedicalResult, Patient, TestPackage, User } from "../models";
import { Op } from 'sequelize'

export const changeStatus = async (appointmentId: string, status: string) => {
    await Appointment.update({ status }, {
        where: { appointmentId }
    })
}

export const getAllAppointments = async (userId: string, query: { [key:string]: any }) => {
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
                            userId: userId,
                        },
                        required: true
                    }],
                    // required: true
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
                                    userId: userId,
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
                    attributes: ["userId", "name", "role"],
                    where: {
                        role: 'DOCTOR',
                        userId: userId,
                    },
                    required: true
                }]
            },

            {
                model: MedicalResult,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }
        ]
    }

    if (status !== 'ALL') {
        filter.where = { status }
    }
    
    let appos = await Appointment.findAll(filter)
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