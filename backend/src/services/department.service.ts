import { Department, Doctor, Hospital, User } from "../models"
import { convertDateTime } from "../utils/converter"
import { Op } from 'sequelize';

export const allDepartments = async() => {
    return Department.findAll({
        attributes: ["name", "avatar"],
        group: ["name", "avatar"]
    })
}

export const getAllDoctors = async (departmentId: string, query: {
    date: string,
    time: string,
    name: string,
}) => {
    // const dateTime = convertDateTime(query.date, query.time);
    const filterUser: { [key: string]: any } = {
        role: 'DOCTOR'
    }

    if (query.name) {
        filterUser.name = {
            [Op.like]: `%${query.name}%`
        };
    }

    return Doctor.findAll({
        where: {
            departmentId
        },

        include: [{
            model: User,
            attributes: ["userId", "name", "avatar"],
            where: filterUser
        },
        {
            model: Department,
            attributes: ["name"],
            include: [{
                model: Hospital,
                attributes: ["hospitalId"],

                include: [{
                    model: User,
                    attributes: ["name"]
                }]
            }]
        }
        ]
    })
}