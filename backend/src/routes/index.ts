import { Application } from 'express';
import postRouter from './post.route'
import userRouter from './user.route'
import hospitalRouter from './hospital.route'
import homeRouter from './home.route'
import authRouter from './auth.route'
import patientRouter from './patient.route'
import testPackageRouter from './testPackage.route'
import chatRouter from './chat.route'
import departmentRouter from './departmet.route'

import { authMiddleware } from '../middleware/auth';
import {roleCheck} from '../middleware/role'

export default function initRoutes(app: Application) {
    app.use("/api/auth", authRouter)
    app.use("/api/post", authMiddleware, roleCheck("DOCTOR", "PATIENT", "HOSPITAL"), postRouter)
    app.use("/api/user", authMiddleware, roleCheck("DOCTOR", "PATIENT", "HOSPITAL"), userRouter)
    app.use("/api/hospital", authMiddleware, roleCheck("DOCTOR", "PATIENT", "HOSPITAL" ), hospitalRouter)
    app.use("/api/patient", authMiddleware, roleCheck("PATIENT"), patientRouter)
    app.use("/api/test_package", authMiddleware, roleCheck("PATIENT", "DOCTOR", "HOSPITAL"), testPackageRouter)
    app.use("/api/chat", authMiddleware, chatRouter)
    app.use("/api/department", authMiddleware, departmentRouter)
    app.use("/api", authMiddleware, roleCheck("DOCTOR", "PATIENT"), homeRouter)
};