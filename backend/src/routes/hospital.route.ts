import express from "express";

import * as hospitalController from '../controllers/hospital.controller';

const router = express.Router();

router.route("/:id")
    .get(hospitalController.hospitalInfo)

router.route("/:id/department")
    .get(hospitalController.getDepartments)

router.route("/:id/appointment")
    .get(hospitalController.getAllAppointments)

router.route("/appointment/:id")
    .put(hospitalController.handleAppointments)

router.route('/assign_doctor_appointment')
    .post(hospitalController.assignDoctorAppointment)

router.route("/department")
    .post(hospitalController.createDepartment)
    
export default router