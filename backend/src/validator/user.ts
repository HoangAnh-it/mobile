import { StatusCodes } from "http-status-codes"
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto"
import CustomError from "../error/CustomError"
import { trimObject } from "../utils/object"
import { isValidEmail, isValidDate, isValidPhoneNumber } from "./other"

export const validateCreateUser = (user: CreateUserDTO): CreateUserDTO => {
    const results = trimObject(user) as CreateUserDTO

    if (!results.email || !results.password || !results.name || !results.birthDay || !results.phone || !results.address) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Missing value. Must fill out all information")
    }

    if (!isValidEmail(results.email)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid email")
    }

    if (results.password.length < 8) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Password must be more than 8 characters")
    }

    if (!isValidDate(results.birthDay)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid birthday.Must be YYYY-MM-DD")
    }
    
    if (!isValidPhoneNumber(results.phone)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid phone number")
    }

    // check role ?

    return results
}

export const validateUpdateUser = (user: UpdateUserDTO): UpdateUserDTO => {
    const updateUser = trimObject(user)
    
    if ('name' in updateUser && !updateUser.name) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid first name")
    }

    if ('email' in updateUser && !isValidEmail(updateUser.email)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid email")
    }

    if ('birthDay' in updateUser && !isValidDate(updateUser.birthDay)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid birthday.Must be YYYY-MM-DD")
    }
    
    if ('phone' in updateUser && !isValidPhoneNumber(updateUser.phone)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid phone number")
    }

    if ('address' in updateUser && !isValidPhoneNumber(updateUser.phone)) {
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid address")
    }
    return updateUser
}

export const validatePassword = (password: string) => {
    password = password?.trim()
    if (password.length < 8) {
        throw new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, "Password must be at least 8 characters")
    }
    return password
}