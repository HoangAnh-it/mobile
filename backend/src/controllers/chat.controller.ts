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
        socket.on("handshake", ({userId, socketId}: {[key: string]: string}) => {
            uid[userId] = socketId
            console.log("JOIN: ", userId, socketId)
        })

        socket.on('delete medical record', (id: string) => {
            socket.emit('delete medical record', id)
        })

        socket.on('delete appointment', (id: string) => {
            socket.emit('delete appointment', id)
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
    
    const { socket } = req.app.get("socket.io")
    socket.in(uid[userId]).emit('message', d)
    if (uid[partnerId]) {
        socket.in(uid[partnerId]).emit("message", d)
    }
    return res.status(StatusCodes.OK).json({
        data: d
    });
})
