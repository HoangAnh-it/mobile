import { Appointment } from "../models"

export const changeStatus = async (appointmentId: string, status: string) => {
    await Appointment.update({ status }, {
        where: { appointmentId }
    })
}