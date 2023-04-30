import express from 'express'
import * as  userController  from '../controllers/user.controller'
const router = express.Router()

router.route("/posts")
    .get(userController.allPosts)

router.route("/profile")
    .get(userController.profile)
export default router;