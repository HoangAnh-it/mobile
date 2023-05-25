import { query }  from 'express'
import { Op } from 'sequelize'
import { Department, Doctor, Hospital, TestPackage, User } from "../models"
import { Sequelize } from 'sequelize-typescript'


const LIMIT_PREVIEW_RECORDS = 2

export const searchPreview = async(keyword :string) => {
    if (!keyword) {
            return []
    }
    const doctorsPromise = User.findAll({
        where: {
            [Op.and]: [
                {
                    role: 'DOCTOR',
                    name: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ]
            
        },
        attributes: ["userId", "name", "avatar"],
        include: {
            model: Doctor,
            attributes: ["doctorId"],
            include: [{
                model: Department,
                attributes: ["name"]
            }]
        },
        // limit: LIMIT_PREVIEW_RECORDS
    })

    const hospitalPromise = searchHospitals(keyword)

    const testPackages = TestPackage.findAll({
        where: {
            name: {
                [Op.like]: `%${keyword}%`
            }
        },
        attributes: ["testPackageId", "name", "price"],
        include: {
            model: Department,
            attributes: ["departmentId", "name"],
            include: [{
                model: Hospital,
                attributes: ["userId"],
                include: [{
                    model: User,
                    attributes: ["userId", "name", "avatar"]
                }]
            }]
        }
        // limit: LIMIT_PREVIEW_RECORDS
    })

    return Promise.all([doctorsPromise, hospitalPromise, testPackages])
}

export const searchDoctors = async(keyword: string, d: string) => {
    return User.findAll({
        where: {
            [Op.and]: [
                {
                    role: 'DOCTOR',
                    name: {
                        [Op.like]: `%${keyword}%`
                    }
                }
            ]
            
        },
        attributes: ["userId", "name", "avatar"],
        include: [{
            model: Doctor,
            attributes: ["doctorId"],
            include: [{
                model: Department,
                attributes: ["name", "departmentId"],
                where: {
                    name: {
                        [Op.like]: `%${d}%`
                    }
                },
                required: true
            }],
            required: true
        }],
    })
}

export const searchHospitals = async (keyword: string) => {
    return User.findAll({
        where: {
            name: {
                [Op.like]: `%${keyword.trim()}%`
            },
            role: 'HOSPITAL'
        },
        attributes: ["userId", "name", "address", "avatar"],
        include: {
            model: Hospital,
            attributes: ["hospitalId", "description"]
        }
    })
}