import { StatusCodes } from "http-status-codes";
import ErrorWrapperHandler from "../utils/ErrorWrapperHandler";
import { Application, NextFunction, Request, Response } from 'express'
import { chatService, userService } from "../services";
import { CreateMessageDTO } from "../dtos/message.dto";

export let uid: {[key:string]: string} = {}

export const socketSetup = (io: any, app: Application) => {
    io.on("connection", (socket: any) => {
        app.set("socket.io", {io, socket})
        console.log("An user connected:", socket.id)
        socket.emit("handshake", socket.id)
        socket.on("handshake", ({ userId, socketId }: { [key: string]: string }) => {
            if (uid[userId]) return;
            uid[userId] = socketId
            socket.join(socketId)
            console.log("JOIN: ", userId, socketId)
        })

        socket.on('delete medical record', (id: string) => {
            socket.emit('delete medical record', id)
        })

        socket.on('status appointment', (data: {[key:string]: any}) => {
            socket.emit('status appointment', data)
        })
        
        socket.on('reject appointment', (id: string) => {
            socket.emit('reject appointment', id)
        })

        socket.on('update medical record', (data: {[key:string]: any}) => {
            socket.emit('update medical record', data)
        })

        socket.on('create department', (data: { [key: string]: any }) => {
            socket.emit('create department', data)
        })

        socket.on("medical result", (data: { [key: string]: any }) => {
            socket.emit("medical result", data)
        })

        socket.on('reload', (data: boolean) => {
            console.log("reload")
            socket.emit('reload', data)
        })

        socket.on("disconnect", () => {
            console.log("Disconnect from", socket.id)
            const k = Object.keys(uid).find(k => uid[k] === socket.id)
            if (k) {
                delete uid[k]
            }
        })
    })
}

// [GET] /chat
export const allChatPreview = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const chatPreview = await chatService.allChatPreview(userId)
    return res.status(StatusCodes.OK).json({
        data: chatPreview
    });
})

// [POST] /chat/:id
export const inbox = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const partnerId = req.params.id
    const data = await chatService.inbox(userId, partnerId)
    return res.status(StatusCodes.OK).json({
        data: data
    });
})


// [POST] /chat/:id/message
export const sendMessage = ErrorWrapperHandler(async (req: Request, res: Response) => {
    const userId = req.auth?.id
    const partnerId = req.params.id
    const d = await chatService.sendMessage(userId, partnerId, req.body as CreateMessageDTO)
    return res.status(StatusCodes.OK).json({
        data: d
    });
})
