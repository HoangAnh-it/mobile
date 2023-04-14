import express from 'express'
import * as  userController  from '../controllers/user.controller'
const router = express.Router()

router.route("/:id/posts")
    .get(userController.allPosts)

export default router;