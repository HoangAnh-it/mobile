import { Op } from 'sequelize'
import { StatusCodes } from 'http-status-codes';
import {CreateUserDTO, UpdateUserDTO}  from "../dtos/user.dto";
import CustomError from "../error/CustomError";
import { User, Doctor, Department, Hospital, Patient, Notification } from "../models";
import { encodedPassword } from '../utils/bcrypt'
import { user_db } from '../persistence';
import { NotificationDTO } from '../dtos/notification.dto';
import { validateNotification } from '../validator/notification';
import { Sequelize } from 'sequelize-typescript';

export const createUser = async (createUserDTO: CreateUserDTO): Promise<User> => {
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { email: createUserDTO.email },
                { phone: createUserDTO.phone }
            ]
        }
    })

    if (existingUser) {
        throw new CustomError(StatusCodes.CONFLICT, "This email or phone is already used")
    }

    const hashedPassword = encodedPassword(createUserDTO.password)
    const user = await User.create({
        ...createUserDTO,
        password: hashedPassword
    })
    return Promise.resolve(user)
}

export const findUserById = async(id: string) => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User not found: ${id}`)
    }
    return user
}

export const updateByID = async (id: string, updateUser: UpdateUserDTO): Promise<string> => {
    await user_db.findByID(id)
    await User.update(updateUser, {
        where: {userId: id}
    })
    return Promise.resolve(id)
}

export const profile = async (id: string) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
        },
        include: [
            {
                model: Doctor,
                attributes: ["doctorId", "rank"],
                include: [
                    {
                        model: Department,
                        attributes: ["departmentId","name"],
                        include: [
                            {
                                model: Hospital,
                                attributes: ["hospitalId", "name"]
                            }
                        ]
                    }
                ]
            },
            {
                model: Patient,
                attributes: ["patientId"]
            }
        ]
    })
    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, `User with ID: ${id} not found.`)
    }
    return user
}

export const getAllNotifications = async(id: string) => {
    return Notification.findAll({
        where: { userId: id },
        order: [
            [Sequelize.literal('createdAt'), 'DESC']
        ]
    })
}

export const createNotification = async (noti: NotificationDTO) => {
    noti = validateNotification(noti)
    return await Notification.create({
        ...noti,
        isRead: false
    });
}

export const readNotification = async (id: string) => {
    const noti = await Notification.findByPk(id)
    if (!noti) {
        throw new CustomError(StatusCodes.NOT_FOUND, `Notification with ID: ${id} not found`)
    }
    await Notification.update({ isRead: true }, {
        where: {
            notificationId: id
        }
    })
}