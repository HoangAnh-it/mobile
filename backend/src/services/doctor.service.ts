import { Appointment, Department, DoAppointment, MedicalRecord, TestPackage } from "../models"

export const allAppointments = async (userId: string) => {
    return DoAppointment.findAll({
        where: { userId },
        include: [
            {
                model: Appointment,
                include: [
                    {
                        model: MedicalRecord,

                    },
                    {
                        model: Department,
                        attributes: ["name"]
                    },
                    {
                        model: TestPackage,
                        
                    }
                ]
            }]
    })
}