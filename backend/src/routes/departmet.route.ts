import express from 'express';
import * as departmentController  from '../controllers/department.controller';

const router = express.Router();

router.route("/")
    .get(departmentController.allDepartment)

router.route("/:id/doctor")
    .get(departmentController.getDoctors)

export default router;
