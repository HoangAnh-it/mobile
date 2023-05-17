import { Request, Response } from 'express'
import { StatusCodes } from "http-status-codes";
import { CreateUserDTO } from '../dtos/user.dto';
import { authService } from '../services';
import ErrorWrapperHandler from '../utils/ErrorWrapperHandler';
import { validateCreateUser } from '../validator/user';


// [POST] /auth/login
export const login = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    const data =  await authService.login(email, password)
    return res.status(StatusCodes.OK).json({
        message: `Login successfully.`,
        data: data
    });
})


// [POST] /auth/signup
export const register = ErrorWrapperHandler(async (req: Request, res: Response) => {
    let data = req.body
    const userDTO = validateCreateUser(data as CreateUserDTO)
    await authService.signup(userDTO)
    return res.status(StatusCodes.OK).json({
        message: `Register successfully.`,
    })
})

// [GET] /auth/token/:token
export const parseToken = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const { token } = req.params
    const data = await authService.parseToken(token)
    return res.status(StatusCodes.OK).json(data)
})