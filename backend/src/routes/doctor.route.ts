import express from 'express';
import * as doctorController  from '../controllers/doctor.controller';

const router = express.Router();

router.route("/appointment")
    .get(doctorController.allAppointments)

router.route("/appointment/:id/result")
    .post(doctorController.createResultAppointment)
export default router;
