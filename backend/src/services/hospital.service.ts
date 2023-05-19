import { StatusCodes } from 'http-status-codes';
import CustomError from "../error/CustomError";
import { Department, Hospital, User } from "../models";

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