import { StatusCodes } from "http-status-codes";
import CustomError from "../error/CustomError";
import { User } from "../models";
import { comparePassword } from "../utils/bcrypt";
import { Op } from 'sequelize'
import {generateAccessToken, verifyToken} from '../utils/jwt'
import { CreateUserDTO } from "../dtos/user.dto";
import { validateCreateUser } from "../validator/user";

export const login = async (username: string, password: string) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: username },
            ]
        }
    })

    if (!user) {
        throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
    }

    if (!comparePassword(password, user.password)) {
        throw new CustomError(StatusCodes.UNAUTHORIZED, "Wrong password")
    }

    const accessToken = generateAccessToken({
        id: user.userId,
        role: user.role
    })

    return {
        token: accessToken,
        role: user.role,
        userId: user.userId
    }
}

export const signup = async(user: CreateUserDTO) => {
    user = validateCreateUser(user)
    const existingUser = await User.findOne({
        where: {
            email: user.email
        }
    })
    if (existingUser) {
        throw new CustomError(StatusCodes.CONFLICT, `Email: ${user.email} was already used`)
    }
    await User.create({ ...user })
}

export const parseToken = (token: string) => {
    return verifyToken(token)
}