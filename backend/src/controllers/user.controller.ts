import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from "http-status-codes";
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler";
import { chatService, postService, userService } from '../services';
import { CreateMessageDTO } from '../dtos/message.dto';
import { UpdateUserDTO } from '../dtos/user.dto';

// [GET] /user/profile/:id
export const profile = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.params.id
    const data = await userService.profile(userId)
    return res.status(StatusCodes.OK).json({
        data: data
    });
}) 

// [GET] /user/posts
export const allPosts = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const q = req.query
    const posts = await postService.getPostsByUser(userId, q)
    return res.status(StatusCodes.OK).json({
        data: posts
    });
})

// [GET] /user/notification
export const allNotifications = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const notis = await userService.getAllNotifications(userId)
    return res.status(StatusCodes.OK).json({
        data: notis
    });
}) 

// [PUT] /user/notification/read/:id
export const readNotification = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    await userService.readNotification(id)
    return res.status(StatusCodes.OK).json(id);
}) 

// [POST] /user/change-password
export const changePassword = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const { currentPass, newPass } = req.body
    const userId = req.auth?.id
    await userService.changePassword(userId, currentPass, newPass)
    return res.status(StatusCodes.OK).json({
        message: "Change password successfully"
    });
}) 

// [PATCH}] /user/:id
export const updateInfo = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const updatedUser = await userService.updateByID(req.params.id as string, req.body as UpdateUserDTO)
    return res.status(StatusCodes.OK).json({
        data: updatedUser
    });
}) 